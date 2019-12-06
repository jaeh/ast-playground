export const View = (state, children = []) =>
  footer({ class: 'Footer' }, [
    div({ class: 'Container' }, [
      children,
      div({ class: 'Credits' }, [
        'made with a few bits of ',
        Link({ to: 'https://github.com/magic/core', target: '_blank', rel: 'noopener' }, 'magic'),
      ]),
    ]),

    typeof Gdpr === 'function' && Gdpr(state),
  ])

export const style = {
  position: 'relative',
  padding: '2em 0 .5em',

  '.Container': {
    textAlign: 'center',
  },

  '.Credits': {
    display: 'block',
    clear: 'both',
  },
}
