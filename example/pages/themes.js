module.exports = {
  state: {
    title: '@magic-themes',
    description: '@magic-theme docs.',
  },

  View: state => [
    h1(state.title),
    p(
      'magic themes are themes for magic apps. you decide which theme to load by specifying the theme name in config.THEME',
    ),
    Pre(`
// /config.js
module.exports = {
  // ...rest of config,
  THEME: 'blue',
}
`),

    h2('theme load order'),
    p('themes get loaded from multiple places. last in the list overwrites earlier entries.'),
    Pre(`
/node_modules/@magic/core/src/themes/THEME/index.js
/node_modules/@magic-themes/THEME
// ...default module styles get inserted here
/assets/themes/THEME/index.js
`),

    h2({ id: 'magic-themes' }, 'list of magic themes'),
    ThemeList,
  ],
}