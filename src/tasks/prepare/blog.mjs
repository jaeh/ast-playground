import path from 'path'
import { preparePage } from './page.mjs'
import fs from '@magic/fs'

const indexYear = blogDir => ([year, months]) => {
  const yearDir = path.join(blogDir, year)

  return [yearDir, Object.entries(months).map(indexMonth(yearDir))]
}

const indexMonth = yearDir => ([month, days]) => {
  const monthDir = path.join(yearDir, month)

  return [monthDir, Object.entries(days).map(indexDay(monthDir))]
}

const indexDay = monthDir => ([day, posts]) => {
  const dayDir = path.join(monthDir, day)
  return [dayDir, posts]
}

export const prepareBlog = async app => {
  const relativeBlogDir = config.BLOG_DIR.replace(`${config.ROOT}/`, '')

  const extensions = ['.markdown', '.js', '.htm', '.mjs', '.html', '.md']

  let WEB_ROOT = config.WEB_ROOT
  if (WEB_ROOT && WEB_ROOT.endsWith('/')) {
    WEB_ROOT = WEB_ROOT.slice(0, -1)
  }

  WEB_ROOT = `${WEB_ROOT}/${relativeBlogDir}`

  const index = {}

  const posts = await Promise.all(
    app.blog.map(async file => {
      const post = await preparePage({ WEB_ROOT, PAGES: config.BLOG_DIR })(file)
      const rootedBlogPath = file.replace(config.BLOG_DIR, '')
      let [year, month, day, ...postPath] = rootedBlogPath.split('/').filter(a => a)

      if (year.startsWith('index')) {
        return post
      }

      if (month.startsWith('index')) {
        return post
      }

      if (day.startsWith('index')) {
        return post
      }

      if (!postPath.length && day) {
        postPath = day
        day = false
      }

      if (!postPath.length && month) {
        postPath = month
        month = false
      }

      if (year && !index[year]) {
        index[year] = {}
      }

      if (month && !index[year][month]) {
        index[year][month] = {}
      }

      if (day && !index[year][month][day]) {
        index[year][month][day] = [post]
      } else {
        index[year][month][day].push(post)
      }

      return post
    }),
  )

  const file = app.blog.find(file => extensions.some(f => file === relativeBlogDir + f))
  if (!file) {
    const post = {
      View: state => BlogArchive(state),
      name: `${WEB_ROOT}/`,
      path: `${WEB_ROOT}/index.html`,
    }

    posts.push(post)
  }

  // create yearly and monthly archives if they do not exist yet.
  Object.entries(index).forEach(([year, months]) => {
    const yearDir = path.join(config.BLOG_DIR, year, 'index')
    const file = app.blog.find(file => extensions.some(f => file === yearDir + f))

    if (!file) {
      const post = {
        View: state => BlogYear(state),
        name: `${WEB_ROOT}/${year}/`,
        path: `${WEB_ROOT}/${year}/index.html`,
        state: {
          year,
        },
      }

      posts.push(post)
    }

    Object.entries(months).forEach(([month, days]) => {
      const monthDir = path.join(config.BLOG_DIR, year, 'index')
      const file = app.blog.find(file => extensions.some(f => file === monthDir + f))

      if (!file) {
        const post = {
          View: state => BlogMonth(state),
          name: `${WEB_ROOT}/${year}/${month}/`,
          path: `${WEB_ROOT}/${year}/${month}/index.html`,
          state: {
            year,
            month,
          },
        }

        posts.push(post)
      }
    })
  })

  return { posts, index }
}
