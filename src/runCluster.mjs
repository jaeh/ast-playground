import cluster from 'cluster'

import { build, master, watch } from './cluster/index.mjs'

import { runConfig } from './config.mjs'

export const runCluster = async options => {
  const { args, commands } = options

  // get the config
  const config = await runConfig(args)

  if (!global.CHECK_PROPS) {
    const { CHECK_PROPS } = await import('./lib/CHECK_PROPS.mjs')
    global.CHECK_PROPS = CHECK_PROPS
  }

  const { CONFIG_FILE_PATH, DIR, GIT, ROOT, URL, URL_WARNING, WEB_ROOT } = config

  if (cluster.isMaster) {
    await master({ cluster, commands, DIR, GIT, URL, URL_WARNING, WEB_ROOT })
  } else if (cluster.isWorker) {
    if (commands.serve && cluster.worker.id === 1) {
      // watcher,
      // watches the directory and tells master to restart the build process when files change
      watch({ args, ROOT, CONFIG_FILE_PATH, STATIC: DIR.STATIC })
    } else {
      // builder
      // builds the files and pages needed
      build({ commands, config })
    }

    process
      .on('unhandledRejection', error => {
        process.send({ evt: 'error', error: error.toString(), stack: error.stack })
      })
      .on('uncaughtException', error => {
        process.send({ evt: 'error', error: error.toString(), stack: error.stack })
      })
  }
}
