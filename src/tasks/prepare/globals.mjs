import path from 'path'

import deep from '@magic/deep'
import is from '@magic/types'
import log from '@magic/log'

import { getDirectories, getFiles, isUpperCase, toPascal } from '../../lib/index.mjs'

import { builtins } from '../../modules/index.mjs'

export const findNodeModules = async () => {
  let modules = {}

  const nodeModuleDir = path.join(process.cwd(), 'node_modules')

  const recursiveSearch = false

  const dirs = await getDirectories(nodeModuleDir, recursiveSearch)
  const dirPromises = dirs
    .filter(dir => dir.includes('magic-module-'))
    .map(async nodeModule => {
      try {
        const name = nodeModule.split('magic-module-')[1]
        const loadPath = nodeModule.replace(`${nodeModuleDir}/`, '')
        const mod = await import(nodeModule)
        modules[name] = mod
      } catch (e) {
        log.error('Error', `requiring node_module: ${nodeModule}, error: ${e.message}`)
      }
    })

  await Promise.all(dirs)

  const magicModuleDir = path.join(nodeModuleDir, '@magic-modules')
  const nodeModules = await getDirectories(magicModuleDir, recursiveSearch)

  const modulePromises = nodeModules
    .filter(n => nodeModuleDir !== n)
    .map(async nodeModule => {
      if (magicModuleDir !== nodeModule) {
        try {
          const name = toPascal(path.basename(nodeModule))
          const loadPath = nodeModule.replace(`${nodeModuleDir}/`, '')
          const mod = await import(loadPath)
          modules[name] = mod
        } catch (e) {
          log.error('Error', `requiring node_module: ${nodeModule}, error: ${e.message}`)
        }
      }
    })

  await Promise.all([...dirPromises, ...modulePromises])

  return modules
}

export const findLocalModules = async () => {
  let modules = {}

  const assetModules = await getFiles(config.DIR.ASSETS)
  const assetPromises = assetModules
    .filter(m => isUpperCase(path.basename(m)))
    .filter(m => ['.mjs'].some(ext => m.endsWith(ext)))
    .map(async m => {
      try {
        const name = path.basename(m).replace(path.extname(m), '')
        const mod = await import(m)
        modules[name] = mod
      } catch (e) {
        log.error('Error', `requiring local magic-module: ${m}, error: ${e.message}`)
      }
    })

  await Promise.all(assetPromises)

  return modules
}

export const findAssetFile = async () => {
  try {
    const maybeAssetFile = path.join(config.DIR.ASSETS, 'index.mjs')
    const assets = await import(maybeAssetFile)
    let modules = {}
    Object.entries(assets).forEach(([name, mod]) => {
      modules[name] = mod
    })
    return modules
  } catch (e) {
    // we are happy without assetfile
  }
}

export const findBuiltins = () => {
  let modules = {}
  Object.entries(builtins).forEach(([name, mod]) => {
    // tags are and object that duplicates the tags, unneeded
    if (name !== 'tags') {
      modules[name] = mod
    }
  })
  return modules
}

export const findLib = ([name, mod]) => {
  let lib = {}
  if (mod.lib) {
    lib = deep.merge(lib, mod.lib)
  }

  const views = Object.entries(mod).filter(([n]) => isUpperCase(n))
  views.forEach(([n, m]) => {
    // functional modules can not have lib fields
    if (!is.fn(m)) {
      lib = deep.merge(findLib([n, m]))
    }
  })

  return lib
}

export const findLibs = modules =>
  Object.entries(modules)
    .map(findLib)
    .filter(a => !is.empty(a))

export const prepareGlobals = async app => {
  global.keys = global.keys || new Set()
  global.LIB = global.LIB || {}

  let modules = {}

  modules = deep.merge(modules, await findBuiltins(modules))
  modules = deep.merge(modules, await findAssetFile(modules))
  modules = deep.merge(modules, await findLocalModules(modules))
  modules = deep.merge(modules, await findNodeModules(modules))

  let lib = app.lib

  Object.entries(modules).forEach(([name, mod]) => {
    if (is.fn(mod)) {
      global[name] = mod
    } else {
      global[name] = mod.View
    }

    const views = Object.entries(mod).filter(([k]) => isUpperCase(k) && k !== 'View')
    views.forEach(([k, v]) => {
      if (is.function(v)) {
        global[name][k] = v
      } else {
        global[name][k] = v.View
      }
    })
  })

  const libs = await findLibs(modules)
  libs.forEach(l => {
    Object.entries(l).forEach(([name, value]) => {
      lib[name] = value
    })
  })

  const libPromises = Object.entries(lib).map(async ([name, impl]) => {
    global.LIB[name] = await import(impl)
  })

  await Promise.all(libPromises)

  return {
    modules,
    lib,
  }
}
