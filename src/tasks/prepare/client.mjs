import is from '@magic/types'

import { runBabel, fs, handleDependencies, isUpperCase, stringifyObject } from '../../lib/index.mjs'

const prepareCl = async app => {
  const clientImports = ['hyperapp']

  const { CHECK_PROPS } = global

  const { lib, state, actions, pages, style, View, ...rest } = app
  console.log(
    {
      lib,
      state,
      actions,
      pages,
    },
    Object.keys(rest),
  )
}

const prepareClient = async app => {
  // importing hyperapp
  const hyperappImport = "const { app, h } = require('hyperapp')\n"

  let checkProps = ''
  if (config.ENV === 'development') {
    checkProps = `const CHECK_PROPS = ${global.CHECK_PROPS.toString()}`
  }

  // add the Component module that wraps all other html tags
  const componentString = `const C = ${global.component.toString()}\n`
    // replace names of variables to enforce minification
    .replace(/attributes/gm, 'a')
    .replace(/name/gm, 'n')
    .replace(/children/gm, 'c')

  const tempDepString = Object.entries(app.modules)
    .map(([k, v]) => handleDependencies(k, v))
    .join('')

  let libString = ''

  // define every lib import at the top of magic.mjs
  if (!is.empty(app.lib)) {
    if (!is.object(app.lib) || is.array(app.lib)) {
      throw new Error(`Expected app.lib to be an object, received ${typeof app.lib}, ${app.lib}`)
    }

    libString = 'const lib = {};'

    Object.entries(app.lib).forEach(([name, res]) => {
      const libContent = fs.readFileSync(res, 'utf8')
      let lib = libContent
      if (libContent.includes('export default')) {
        lib = libContent.replace('export default', `lib.${name} =`)
      } else if (libContent.includes('export')) {
        libString += `\n lib.${name} = lib.${name} || {};\n`
        lib = libContent.replace('export const ', `lib.${name}.`)
      } else {
        throw new Error(`library ${name} has no exports`)
      }

      const str = `\n  (() => {\n    ${lib}\n  })();\n`
      libString += str
    })
    libString += '\nwindow.LIB = lib\n'
  }

  // create pages object, each Page is a html View
  let pageString = 'const pages = {\n'

  app.pages.forEach(page => {
    pageString += `\n  '${page.name}': ${page.View.toString()},`
  })

  pageString += '\n}\n'

  // handle global app state
  const stateString = `const state = ${stringifyObject(app.state)}`

  // set state.url, can not be done above
  const urlString = `state.url = window.location.pathname`

  const rootString = `state.root = '${config.WEB_ROOT}'`

  // create global actions object
  const actionString = `const actions = ${stringifyObject(app.actions)}\n`

  // routing view
  const viewString = `
const view = (state, actions) => {
  const url = pages[state.url] ? state.url : '/404/'
  // used below, is kind of a global!
  const page = pages[url]

  // map pageState into state
  if (state.pages) {
    const pageState = state.pages[url]
    for (let key in pageState) {
      state[key] = pageState[key]
    }
  }

  // map pageActions into actions
  if (actions.pages) {
    const pageActions = actions.pages[url]
    for (let key in pageActions) {
      actions[key] = pageActions[key]
    }
  }

  return Page.View(page)(state, actions)
}
`

  // get #magic div from html, create it if it does not exist,
  // then mount the app in it.
  const createMagic = `
const d = document
let mD = d.getElementById('Magic')
if (!mD) {
  mD = d.createElement('div')
  mD.id = 'magic'
  d.body.appendChild(mD)
}
app(state, actions, view, mD)\n`

  const tempClientString = [
    // hyperappImport,
    // checkProps,
    componentString,
    tempDepString,
    libString,
    pageString,
    // stateString,
    // urlString,
    // rootString,
    // actionString,
    viewString,
    // createMagic,
  ]
    .filter(a => a)
    .join('\n')

  // console.log(tempClientString)

  const babel = runBabel(config)
  const ast = await babel.parseAsync(tempClientString, { ...babel.opts })

  const moduleNames = Object.keys(app.modules)

  const usedModules = new Set()
  babel.traverse(ast, {
    Identifier(path) {
      const { node, parent } = path
      if (moduleNames.includes(node.name)) {
        const excludedParentTypes = [
          'MemberExpression',
          'VariableDeclarator',
          'BinaryExpression',
          'UpdateExpression',
        ]
        if (!excludedParentTypes.some(t => parent.type === t)) {
          usedModules.add(node.name)
          if (node.name === 's') console.log(node, parent)
        }
      } else if (isUpperCase(node.name)) {
        const { object } = parent
        if (object && moduleNames.includes(object.name)) {
          console.log(node.name)
          usedModules.add(node.name)
        }
      }
    },

    // AssignmentExpression(path) {
    //   console.log(path.node)
    // },

    // ObjectTypeIndexer(path) {
    //   console.log(path)
    //   process.exit(1)
    // },

    // CallExpression(path) {
    //   const moduleName = path.node.callee.name
    //   const excludedCalleeTypes = ['Link', 'Img', 'Pre']
    //   if (!excludedCalleeTypes.some(t => moduleName === t)) {
    //     if (moduleNames.includes(moduleName) && isUpperCase(moduleName)) {
    //       console.log(path.node)
    //     }
    //     //   const args = path.node.arguments[0]
    //   //   if (args.type === 'ObjectExpression') {
    //   //     if (moduleName !== 'Link' && moduleName !== 'Img') {
    //   //       let found = false
    //   //       const props = args.properties
    //   //       props
    //   //         .filter(({ key }) => key && key.name === 'class')
    //   //         .forEach(prop => {
    //   //           const name = prop.key.name
    //   //           const value = prop.value.value
    //   //           found = true
    //   //           console.log(moduleName, name, value)
    //   //           // process.exit(1)
    //   //         })

    //   //       if (!found) {
    //   //         console.log('no class prop given', moduleName, args.properties)
    //   //       }
    //   //     }
    //   //   }
    //   }
    // },
    // ObjectPattern(path) {
    //   console.log(path)
    //   process.exit(1)
    //   const key = path.node.key.name
    //   const value = path.node.value.value
    //   if (key === 'class') {
    //     console.log(key, value, path)
    //   }
    // },
  })

  const cleanDependencies = {}
  Array.from(usedModules)
    // make subModules apply last
    .sort(key => (key.includes('.') ? 1 : -1))
    .forEach(key => {
      console.log({ key })
      if (!key.includes('.')) {
        cleanDependencies[key] = app.modules[key]
      } else {
        // submodule, import parent.
        // ??? maybe find a way to only import the child in those cases
        const par = key.split('.')[0]
        console.log(par, key)
        if (par === 'Menu') {
          console.log(key, app.modules[par])
        }
        cleanDependencies[par] = app.modules[par]
      }
    })

  let dependencyString = ''

  Object.entries(cleanDependencies).forEach(([k, v]) => {
    const depString = handleDependencies(k, v)
    dependencyString += depString
  })

  let clientString = [
    hyperappImport,
    checkProps,
    componentString,
    dependencyString,
    libString,
    pageString,
    stateString,
    urlString,
    rootString,
    actionString,
    viewString,
    createMagic,
  ]
    .filter(a => a)
    .join('\n')

  // // prepend client urls with WEB_ROOT url in production,
  // // this allows, for example, username.github.io/packagename
  if (config.WEB_ROOT !== '/') {
    clientString = clientString
      // find all links, callback gets match, key, delimiter, link
      .replace(
        /('|")?(src|href|to|action|logo)(\1)?\:\s*('|")(.*?)\4/gm,
        (match, d1, key, d2, d, link) => {
          if (link.startsWith(config.WEB_ROOT)) {
            return `${key}: '${link}'`
          }

          const isPageLink = app.pages.some(page =>
            link.startsWith(page.name.replace(config.WEB_ROOT, '/')),
          )
          const isStaticLink = Object.keys(app.static).some(key => key === link)

          if (isPageLink || isStaticLink) {
            link = config.WEB_ROOT + (link.startsWith('/') ? link.substr(1, link.length) : link)
            const str = `${key}: '${link}'`
            return str
          }

          // no matches, return unchanged string
          return match
        },
      )
  }

  return clientString
}

export default prepareCl
