const fs = require('fs')
const path = require('path')
const deep = require('@magic/deep')

const configPath = path.join(process.cwd(), 'config.js')
let config = {}
if (fs.existsSync(configPath)) {
  config = require(configPath)
  if (!config.ROOT) {
    config.ROOT = process.cwd()
  } else if (!config.ROOT.startsWith(process.cwd())) {
    config.ROOT = path.resolve(process.cwd(), config.ROOT)
  }
}

if (!config.ROOT) {
  config.ROOT = process.cwd()
}

config.DIR = config.DIR || {}

config.CLIENT_LIB_NAME = config.CLIENT_LIB_NAME || 'magic'

config.WEB_ROOT = config.WEB_ROOT || '/'

config.HOST = config.HOST || 'localhost'
config.PORT = config.PORT || 2323

config.URL = config.URL || false
config.CNAME = config.hasOwnProperty('CNAME') ? config.CNAME : false
config.ROBOTS_TXT = config.hasOwnProperty('ROBOTS_TXT') ? config.ROBOTS_TXT : true
config.SITEMAP = config.hasOwnProperty('SITEMAP') ? config.SITEMAP : true

const PAGES = path.join(config.ROOT, 'pages')
const PUBLIC = path.join(process.cwd(), config.PUBLIC || config.DIR.PUBLIC || 'public')
const ASSETS = path.join(config.ROOT, 'assets')
const MODULES = path.join(config.ROOT, 'modules')
const STATIC = path.join(ASSETS, 'static')
const THEMES = path.join(ASSETS, 'themes')
const API = path.join(process.cwd(), config.DIR.API || 'api')

const ZIPPABLE = [
  'css',
  'js',
  'html',
  'json',
  'xml',
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'odt',
  'csv',
  'text',
  'txt',
  'ico',
]
const IMAGES = ['jpg', 'jpeg', 'png', 'svg', 'gif']

config = deep.merge(config, {
  DIR: {
    PAGES,
    PUBLIC,
    ASSETS,
    MODULES,
    STATIC,
    THEMES,
    API,
  },
  FILETYPES: {
    ZIPPABLE,
    IMAGES,
  },
  IMAGEMIN: {
    PNG: { quality: [0.95, 1] },
    JPG: { quality: 95 },
    GIF: { optimizationLevel: 3 },
    SVGO: {
      plugins: [
        {
          removeViewBox: false,
        },
      ],
    },
  },
  ENV: process.env.MAGIC_ENV || process.env.NODE_ENV || 'development',
})

module.exports = config
