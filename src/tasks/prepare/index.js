const path = require('path')
const is = require('@magic/types')
const deep = require('@magic/deep')
let modules = require('../../modules')
const adminModules = require('../../modules/admin/modules')
const { getFiles, getPages, getDependencies, isUpperCase, fs } = require('../../lib')
const prepareClient = require('./client')
const preparePages = require('./pages')
const prepareStyle = require('./style')

const { isGlobal, mapLibToGlobal } = require('./lib')

global.keys = new Set()

const prepare = async app => {
  app.lib = app.lib || {}
  const maybeAssetFile = path.join(config.DIR.ASSETS, 'index.js')
  if (await fs.exists(maybeAssetFile)) {
    const assets = require(maybeAssetFile)
    modules = deep.merge(modules, assets)
  }

  Object.entries(modules).forEach(([key, value]) => {
    keys.add(key)
    global[key] = value
  })

  const files = await getPages()

  app.files = files

  let dependencies = getDependencies(app.Body, global.keys)

  if (config.ENV === 'development') {
    dependencies = deep.merge(dependencies, adminModules)
    app.state.config = global.config
  }

  // using merge here to make sure app.state and app.actions are being set if undefined
  app.state = deep.merge({}, app.state)
  app.actions = deep.merge({}, app.actions)

  // collect the pages, create their states
  app.pages = preparePages(files)

  app.pages.map(page => {
    if (!is.empty(page.state)) {
      if (!app.state.pages) {
        app.state.pages = {}
      }
      app.state.pages[page.name] = page.state
    }
    if (!is.empty(page.actions)) {
      if (!app.actions.pages) {
        app.actions.pages = {}
      }
      app.actions.pages[page.name] = page.actions
    }

    if (!is.empty(page.lib)) {
      app.lib = deep.merge(page.lib, app.lib)
    }

    return page
  })

  app.pages.forEach(page => {
    // make sure dependencies contains all recursive dependencies
    dependencies = deep.merge(page.dependencies, dependencies)
  })

  app.dependencies = {}
  dependencies.forEach(dep => {
    Object.entries(dep).forEach(([key, val]) => {
      app.dependencies[key] = val
    })
  })

  // collect all static files,
  // write their buffers into app.static
  app.static = {}
  if (await fs.exists(config.DIR.STATIC)) {
    const staticFiles = await getFiles(config.DIR.STATIC)
    if (staticFiles) {
      await Promise.all(
        staticFiles.map(async f => {
          const name = f.replace(config.DIR.STATIC, '')
          // TODO: use streams here
          app.static[name] = await fs.readFile(f)
        }),
      )
    }
  }

  app.style = await prepareStyle(app)

  // merge component states and actions into app.state[componentName].
  // this makes all identical components share their state and actions.
  Object.entries(app.dependencies)
    .filter(([name]) => isUpperCase(name))
    .forEach(([name, component]) => {
      const lowerName = name.toLowerCase()

      const glob = component.global || {}

      if (!is.empty(component.state)) {
        Object.entries(component.state).forEach(([key, val]) => {
          if (isGlobal(glob.state, key)) {
            app.state[key] = val
          } else {
            app.state[lowerName] = app.state[lowerName] || {}
            app.state[lowerName][key] = val
          }
        })
      }

      if (!is.empty(component.actions)) {
        Object.entries(component.actions).forEach(([key, val]) => {
          if (isGlobal(glob.actions, key)) {
            app.actions[key] = val
          } else {
            app.actions[lowerName] = app.actions[lowerName] || {}
            app.actions[lowerName][key] = val
          }
        })
      }

      if (!is.empty(component.lib)) {
        app.lib = deep.merge(component.lib, app.lib)
      }
    })

  if (!is.empty(app.lib)) {
    const deps = mapLibToGlobal(app.lib)

    app.dependencies = deep.merge(deps, app.dependencies)
  }

  // create client magic.js file
  app.client = {
    str: prepareClient(app),
  }

  // extract lambdas and prepare them
  app.lambdas = {}
  Object.entries(app.dependencies)
    .filter(([_, dep]) => dep.server)
    .forEach(([name, dep]) => {
      app.lambdas[name.toLowerCase()] = dep.server
    })

  return app
}

module.exports = prepare
