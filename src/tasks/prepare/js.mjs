import path from 'path'

import is from '@magic/types'

import { fs, isUpperCase, stringifyObject } from '../../lib/index.mjs'

export const prepareJs = async magic => {
  const hyperappPath = path.join(
    process.cwd(),
    'node_modules',
    '@magic',
    'hyperapp',
    'src',
    'index.mjs',
  )
  const hyperappContent = await fs.readFile(hyperappPath, 'utf8')

  // only load Lazy if requested by user
  let imports = 'h, app'
  if (magic.modules.Lazy) {
    imports += ', Lazy'
  }

  delete magic.modules.Lazy

  // replace hyperapp exports, wrap it in a closure
  // return needed exports only to allow dead code elimination
  const hyperapp = `
const { ${imports} } = (() => {
${hyperappContent.replace(/export /g, ' ')}
return { ${imports} }
})()`

  // add the Component module that wraps all other html tags
  const componentString = `const C = ${global.component.toString()}\n`
    // replace names of variables to enforce minification
    .replace(/attributes/gm, 'a')
    .replace(/name/gm, 'n')
    .replace(/children/gm, 'c')

  let checkProps = ''
  let propTypeString = ''
  if (config.IS_DEV) {
    // add proptype checking
    checkProps = `const CHECK_PROPS = ${global.CHECK_PROPS.toString()}`

    propTypeString = 'const propTypes = {\n'
    propTypeString += Object.entries(magic.modules)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([_, mod]) => {
        const subPropTypes = Object.entries(mod)
          .sort(([a], [b]) => (a > b ? 1 : -1))
          .filter(([k, { propTypes }]) => isUpperCase(k) && k !== 'View' && propTypes)
          .map(([_, sm]) =>
            Object.entries(sm.propTypes)
              .sort(([a], [b]) => (a > b ? 1 : -1))
              .map(([k, t]) => `${k}: ${JSON.stringify(t, null, 2)}`)
              .join(',\n'),
          )
          .filter(a => a)
          .join(',\n')

        let propString = ''
        if (mod.propTypes) {
          propString = Object.entries(mod.propTypes)
            .sort(([a], [b]) => (a > b ? 1 : -1))
            .map(([key, type]) => `${key}: ${JSON.stringify(type, null, 2)}`)
            .join(',\n')
        }
        if (subPropTypes) {
          propString += `\n${subPropTypes}`
        }
        return propString
      })
      .filter(a => a)
      .join(',\n')

    propTypeString += '\n}'
  }

  let depString = ''
  let htmlTagString = ''
  Object.entries(magic.modules)
    .filter(([k]) => k !== 'Magic' && k !== 'component')
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .forEach(([k, v]) => {
      if (!isUpperCase(k)) {
        htmlTagString += `const ${k} = C('${k}')\n`
      } else {
        let str
        if (is.function(v)) {
          str = `\nconst ${k} = ${v.toString()}\n`
        } else {
          str = `\nconst ${k} = ${v.View.toString()}\n`
        }

        const subStr = Object.entries(v)
          .filter(([sk]) => isUpperCase(sk) && sk !== 'View')
          .sort(([a], [b]) => (a > b ? 1 : -1))
          .map(([sk, sv]) => `\n${k}.${sk} = ${is.fn(sv) ? sv.toString() : sv.View.toString()}`)
          .join('\n')

        depString += `${str}\n${subStr}`
      }
    })

  let stateString = `const initialState = ${stringifyObject(magic.state)}`

  let helperString = ''
  if (!is.empty(magic.helpers)) {
    helperString = `const helpers = ${stringifyObject(magic.helpers)}`
  }

  let actionString = ''
  if (!is.empty(magic.actions)) {
    // create global actions object
    actionString = `const actions = ${stringifyObject(magic.actions)}\n`
  }

  // create global effects object
  let effectString = ''
  if (!is.empty(magic.effects)) {
    effectString = `const effects = ${stringifyObject(magic.effects)}\n`
  }

  // create global subscription object
  let subscriptionString = ''
  if (!is.empty(magic.subscriptions)) {
    subscriptionString = `
  subscriptions: state => [
    [${magic.subscriptions.join('],\n    [')}]
  ],
`.trim()
  }

  let libString = ''
  if (!is.empty(magic.lib)) {
    libString = 'const lib = {'
    const libPromises = Object.entries(magic.lib)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(async ([name, lib]) => {
        if (lib.startsWith('@')) {
          lib = path.join(process.cwd(), 'node_modules', lib)
        }
        if (!lib.endsWith('index.mjs')) {
          lib = path.join(lib, 'src', 'index.mjs')
        }

        const contents = await fs.readFile(lib, 'utf8')
        return `  ${name}: (() => {${contents
          .replace(/export default/g, `return`)
          .replace(/export /g, '')}})(),`
      })

    const libArray = await Promise.all(libPromises)
    libString += libArray.join('\n')
    libString += '\n}'
  }

  // create pages object, each Page is a html View
  let pageString = 'const pages = {\n'

  magic.pages
    .sort(({ name: a }, { name: b }) => (a > b ? 1 : -1))
    .forEach(page => {
      pageString += `\n  '${page.name}': ${page.View.toString()},`
    })

  pageString += '\n}\n'

  // unused for now
  const serviceWorkerString = `
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('${config.WEB_ROOT}service-worker.js')
}
`

  let initFunc = `() =>`
  if (config.HOIST.includes('Gdpr') && app.actions.gdpr) {
    initFunc += ` actions.gdpr.load({
  ...initialState,
  cookies: ${stringifyObject(magic.cookies)},
  url: window.location.pathname,
})`
  } else {
    initFunc += ` ({
...initialState,
url: window.location.pathname,
})`
  }

  let hoisted = ''
  if (!is.empty(config.HOIST)) {
    if (is.array(config.HOIST)) {
      hoisted = config.HOIST.map(component => `${component}(state)`).join(',')
      if (config.HOIST.length > 1) {
        hoisted = `[${hoisted}]`
      } else if (config.HOIST.length === 0) {
        hoisted = ''
      }
    } else if (is.string(config.HOIST)) {
      hoisted = config.HOIST
      if (!hoisted.includes('state')) {
        hoisted = `${hoisted}(state)`
      }
    }
  }

  // generate string to write to client js
  const appString = `
app({
  init: ${initFunc},
  ${subscriptionString}
  view: state => {
    const url = pages[state.url] ? state.url : '/404/'
    const page = pages[url]

    // map pageState into state
    const s = state.pages && state.pages[url]
    if (s) {
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }

    return Page({ page, state }${hoisted ? `, ${hoisted}` : ''} )
  },
  node: document.getElementById('Magic'),
})
`

  const clientString = [
    hyperapp,
    checkProps,
    propTypeString,
    componentString,
    htmlTagString,
    stateString,
    helperString,
    depString,
    libString,
    actionString,
    effectString,
    pageString,
    appString,
    // serviceWorkerString,
  ]
    .join('\n')
    .trim()

  return clientString
}
