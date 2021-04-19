export const View = state => [
  h2('Test page'),

  p('This page shows various features and tests of magic functionality'),

  h3('Link Tests:'),

  ul([
    li(Link({ to: '/modules/' })),
    li(Link({ to: '/modules/#gl-magic-modules' })),
    li(Link({ to: 'https://magic.github.io' })),
  ]),

  h3('Broken link tests:'),

  p("the following links are broken, and it's intentional for magic to warn us on every rebuild."),

  ul([
    li(Link({ text: 'redirect link', to: 'https://magic.github.io/core' })),

    li(Link({ to: 'broken link', text: 'https://expect-error' })),
    li(
      Link({
        to: '404 link',
        text: 'https://en.wikipedia.org/hMdYfVaKY4btraQcgD0me6RRBDnugbpJ4FLpgJgeB7',
      }),
    ),
    li(Img({ alt: 'Broken Image Link', src: 'https://broken-image-link' })),
  ]),

  h3('Image test'),

  p("while at it, let's test an image, 2 times with a working src:"),

  ul([
    li(Img({ alt: 'Magic Logo', src: '/logo.png' })),
    li(Img({ alt: 'Magic Logo', src: '/core/logo.png' })),
  ]),

  p('and once with a broken src:'),

  Img({ alt: 'Broken Magic Logo', src: '/logo23-broken.png' }),

  h3('Appending css files'),

  div(
    { id: 'AddCss' },
    'If this text is green, additional css files can be loaded using the config.ADD_CSS array',
  ),

  Pre(`
// /magic.js

export default {
  // ...otherConfig,
  ADD_CSS: ['/addCss.css'], // points to src/assets/static/addCss.css
}
`),
]
