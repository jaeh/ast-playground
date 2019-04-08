const path = require('path')
const deep = require('@magic/deep')

const { isUpperCase, getDependencies } = require('../../lib')

const preparePages = files => {
  const pages = files.map(file => {
    const page = require(file)
    page.file = file
    page.name = file
      .replace(config.DIR.PAGES, '')
      .replace(/index.js/gm, '')
      .replace('.js', '/')

    page.path = path.join(config.DIR.PUBLIC, page.name)
    if (page.path.endsWith('/')) {
      page.path = path.join(page.path, 'index.html')
    }

    page.dependencies = getDependencies(page.View.toString())

    // merge dependency styles and dependencies into page dependencies
    Object.entries(page.dependencies).forEach(([k, c]) => {
      if (c.style) {
        page.style = deep.merge(c.style, page.style)
      }

      const views = Object.entries(c)
        .filter(([k]) => isUpperCase(k))
        .map(([_, v]) => v.toString())

      views.forEach(view => {
        page.dependencies = deep.merge(getDependencies(view), page.dependencies)
      })
    })

    return page
  })

  const has404 = pages.some(p => p.name === '/404/')

  if (!has404) {
    const page404 = {
      name: '/404/',
      path: path.join(config.DIR.PUBLIC, '404', 'index.html'),
      View: (state, actions) => div('404 - not found'),
    }
    page404.dependencies = getDependencies(page404.View.toString())
    pages.push(page404)
  }

  return pages
}
module.exports = preparePages