import path from 'path'
import URL from 'url'

import fs from '@magic/fs'
import is from '@magic/types'

import { addTrailingSlash } from '../../lib/index.mjs'

export const handler = app => (req, res) => {
  const { IS_PROD } = config
  const { css, client, static: stat, lambdas, sw } = app
  const WEB_ROOT = addTrailingSlash(config.WEB_ROOT)
  const url = URL.parse(req.url)
  let { pathname } = url

  if (pathname.startsWith(WEB_ROOT)) {
    pathname = pathname.replace(WEB_ROOT, '/')
  }

  const rawUrl = url.pathname.replace(config.WEB_ROOT, '/')

  if (rawUrl.startsWith('/api')) {
    const [module, action] = rawUrl
      .replace('/api/', '')
      .split('/')
      .filter(a => a)

    let lambda = lambdas[module]
    if (is.objectNative(lambda) && action) {
      lambda = lambda[action]
    }

    if (is.function(lambda)) {
      req.body = []

      req.on('data', chunk => {
        if (typeof chunk === 'string') {
          chunk = Buffer.from(chunk)
        }

        req.body.push(chunk)
      })

      req.on('end', (...args) => {
        req.body = Buffer.concat(req.body).toString()

        const { code, body, type = 'text/plain' } = lambda(req, res, ...args)
        res.writeHead(code, { 'Content-Type': type })
        res.end(body)
      })

      return
    }
  }

  const pages = Object.fromEntries(app.pages.map(page => [page.name, page.rendered]))

  const style = IS_PROD ? css.minified : css.css

  const expiryTime = new Date(new Date().getTime() - 1000).toUTCString()
  const headers = {
    Expires: expiryTime,
    'Cache-Control': 'no-cache, must-revalidate',
    Pragma: 'no-cache',
  }

  const cssUrl = `/${config.CLIENT_LIB_NAME}.css`

  if (rawUrl === cssUrl) {
    res.writeHead(200, { ...headers, 'Content-Type': 'text/css' })
    res.end(style)
    return
  }

  const jsUrl = `/${config.CLIENT_LIB_NAME}.js`
  if (rawUrl === jsUrl) {
    res.writeHead(200, { ...headers, 'Content-Type': 'application/javascript' })
    res.end(client)
    return
  }

  // const swUrl = `/${config.CLIENT_SERVICE_WORKER_NAME}.js`
  // if (rawUrl === swUrl) {
  //   res.writeHead(200, { ...headers, 'Content-Type': 'application/javascript' })
  //   res.end(sw)
  //   return
  // }

  if (stat[rawUrl]) {
    const contentType = fs.getContentType(rawUrl)
    res.writeHead(200, { ...headers, 'Content-Type': contentType })
    res.end(stat[rawUrl])
    return
  }

  if (pages[url.pathname]) {
    if (config.FOR_DEATH_CAN_NOT_HAVE_HIM) {
      headers['X-Clacks-Overhead'] = 'GNU Terry Pratchet'
    }

    res.writeHead(200, { ...headers, 'Content-Type': 'text/html' })
    res.end(pages[url.pathname])
    return
  }

  // 404. we redirect to the root
  let Location = WEB_ROOT

  if (pages[`${url.pathname}/`]) {
    Location = `${url.pathname}/`
  }

  res.writeHead(302, { Location })
  res.end()
}

export default handler
