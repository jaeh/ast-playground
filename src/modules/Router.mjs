export const View = ({ page, state }, children) => {
  page = page ? page(state) : '404 - not found'

  const magicProps = {
    id: 'Magic',
    class: state.pageClass,
  }

  const wrapperProps = {
    class: {
      Wrapper: true,
    },
  }

  return main(magicProps, div(wrapperProps, [Route({ state, page }), children]))
}

export const Link = ({ to, action = actions.go, ...p }, children) => {
  const { href, text, nofollow, noreferrer, ...props } = p
  to = to || href || ''
  props.href = to

  const isLocal = to[0] === '/' || to[0] === '#'

  if (isLocal) {
    props.onclick = [action, lib.preventDefault]
  } else {
    props.target = '_blank'
    props.rel = 'noopener'
    if (nofollow) {
      props.rel += ' nofollow'
    }
    if (noreferrer) {
      props.rel += ' noreferrer'
    }
  }

  return a(props, [text, children])
}

export const state = {
  pageClass: {},
}

export const actions = {
  pop: (state, e) => {
    let { pathname: url, hash } = window.location
    hash = hash.substring(1)

    if (e.state) {
      url = e.state.url
      hash = e.state.hash
    }

    if (hash) {
      window.location.hash = hash
    } else {
      window.scroll(0, 0)
    }

    return {
      ...state,
      url,
      hash,
    }
  },

  go: (state, e) => {
    // make sure our to never includes the origin
    // this makes sure we can distinguish between local and external links below
    let to = e.currentTarget.href.replace(window.location.origin, '')

    const [url, hash = ''] = to.split('#')

    // do nothing if url would not change
    if (url === state.url) {
      if (hash && hash === state.hash) {
        return state
      } else {
        window.scroll({ top: 0, behaviour: 'smooth' })
      }
    }

    window.history.pushState({ url, hash }, '', to)

    if (!hash) {
      window.scroll({ top: 0, behaviour: 'smooth' })
    } else {
      window.location.hash = hash
    }

    return {
      ...state,
      url,
      hash,
      prev: state.url,
    }
  },
}

export const helpers = {
  listenPopState: (dispatch, action) => {
    const listener = e => dispatch(action, e)

    addEventListener('popstate', listener)

    return () => removeEventListener('popstate', listener)
  },
}

export const subscriptions = [['helpers.listenPopState', 'actions.pop']]

export const global = {
  actions: {
    go: true,
    pop: true,
  },
  state: {
    pageClass: true,
  },
}
