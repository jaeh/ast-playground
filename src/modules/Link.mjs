export const View = ({ to, ...p }, children) => {
  const { href, text, nofollow, noreferrer, onclick, ...props } = p
  to = to || href || ''
  props.href = to

  if (to && to.startsWith('/') && !to.startsWith(`//`)) {
    props.onclick = e => {
      if (onclick) {
        return [onclick, { e, to }]
      }
      return [actions.go, { e, to }]
    }
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

export const actions = {
  go: props => state => {
    // trigger event if history api does not exist
    if (typeof window === 'undefined' || !window.history) {
      return true
    }
    const { to } = props
    const e = props.e ? props.e : props
    e.preventDefault()

    let url = state.url
    let [uri, hash = ''] = url.split('#')

    // if we have clicked a link, we have a to
    if (to) {
      url = to.replace(window.location.origin, '')
      const [u, h = ''] = url.split('#')
      uri = u
      hash = !h || h === '/' ? '' : h
      const stateHash = state.hash ? `#${state.hash}` : window.location.hash
      const stateUrl = state.url + stateHash
      if (url !== stateUrl || hash !== stateHash) {
        window.history && window.history.pushState({ uri }, '', url)
        if (!hash) {
          window.scrollTo(0, 0)
        }
      }
    } else {
      // in case of popstate events firing, we do not have props.to
      // but instead the e is a history event
      if (e.state) {
        uri = e.state.uri
      } else {
        uri = '/'
      }
    }

    // window exists for sure, but make sure window.location also does
    if (window.location && hash) {
      const target = document.getElementById(hash)
      if (target) {
        const top = target.offsetTop
        window.scrollTo(0, top)
        window.location.hash = hash
      }
    }

    return {
      url: uri,
      hash,
      prev: state.url,
    }
  },
}

export const global = {
  actions: {
    go: true,
  },
}