module.exports = {
  state: {
    title: '@magic-modules',
    description: '@magic-modules documentation.',
  },

  View: state => [
    h1(state.title),
    p('magic modules are predefined modules for webapps.'),

    h2('module definition:'),
    p('the minimal module is a function that returns some html.'),
    Pre.View(`
// /assets/ModuleName.js

// simplest module
module.exports = () => div('hello, world')

// complete signature
module.exports = (props, children) => (state, actions) => div('hello, world')
`),

    h2('usage:'),
    p('to use a module in your app it has to be imported using /assets/index.js. '),
    Pre.View(`
// /assets/index.js
module.exports = {
  // ...otherModules

  // load module from /assets/Mod.js
  Mod: require('./Mod'),

  // load module from node_modules
  NpmModule: require('@magic-modules/npm-module'),
}`),
    p(
      'after this, the module will be a global in your app and can be used like any other component.',
    ),

    Pre.View(`
// any page or module
module.exports = () => div([
  'modules that do not need props can be used without calling them as a function ',
  Mod.View,
  'modules that need props: ',
  Mod.View(propObject),
`),

    h2('Mod.View and Mod.Component:'),

    Mod.View,
    Mod.Component,

    h2('preinstalled magic modules'),
    p('magic has some preinstalled modules that will be used in most pages.'),

    h2('app'),
    p(
      'this is the main app module. it has magically inherited properties and all of it is customizable.',
    ),
    p([
      'to add actions/state/style to the app you can just create an /assets/app.js file.',
      'the contents of this file get ',
      Link({ to: 'https://github.com/magic/deep', text: 'deep .merged' }),
      ' into the app',
    ]),
    Pre.View(`
// /assets/app.js
module.exports = {
  state: {
    merge: 'gets merged into state',
  },
  actions: {
    mergedActions: () => ({ merge: 'merged action executed' }),
  },
  style: {
    body: {
      backgroundColor: 'white',
    },
  },
}
`),

    h2('menu'),
    p('the Menu module provides... menus.'),
    p(
      'just pass it a string which is the state key of the menu, add that menu to the /assets/app.js file.',
    ),
    Pre.View(`
// assets/app.js
module.exports = {
  state: {
    // ...state
    menuName: [
      { to: '/example-page', text: 'example page' },
      { to: 'https://example.com', text: 'example.com' },
      { to: 'https://example.com', nofollow: true, noreferrer: true, target: 'utopia', text: 'nofollow and noref" },
    ],
  },
  // ... rest of app.js
}`),

    p('then, in a page or module'),
    Pre.View(`
module.exports = () => Menu.View({ name: 'menuName' })

// outputs:
<nav class="Menu">
  <ul>
    <li>
      <a onclick="actions.go" href="{{ WEB_ROOT }}example-page">example page</a>
    </li>
    <li>
      <a href="https://example.com" target="_blank" rel="noopener">example.com</a>
    </li>
    <li>
      <a href="https://example.com" target="utopia" rel="noopener nofollow noreferrer">nofollow and noref</a>
    </li>
  </ul>
</nav>
}`),

    h2('link'),
    p('the link element allows you to link to things.'),
    Pre.View(`
// in any page or module View
module.exports = () => [
  Link({ to: '/page', text: 'page' }),
  // outputs <a href="/page" onclick="actions.go">page</a>
  Link({ to: 'https://example.com', text: 'page' }),
  // outputs <a href="https://example.com" target="_blank" rel="noopener">page</a>
  Link({ to: '/page', text: 'page', nofollow: true, noreferrer: true }),
  // outputs <a href="https://example.com" target="_blank" rel="nofollow noreferrer noopener">page</a>

  // you can also use children syntax instead of the text prop:
  Link({ to: '/' }, 'home')
`),

    h2('footer'),
    p('the footer module contains a small info text and a link to the magic github repository.'),
    p(
      'to overwrite this behaviour, just place a Footer.js file in your assets and require it in /assets/index.js',
    ),
    Pre.View(`
// /assets/Footer.js:
const Footer = {
  style: {
    'footer.main': {
      position: 'relative',
      textAlign: 'center',
      padding: '5em 0 .5em',
    },
  },
  View: () =>
    footer({ class: 'main' }, [
      div({ class: 'wrapper' }, [
        'made with a few bits of ',
        Link({ href: 'https://github.com/magic/core0', target: '_blank', rel: 'noopener' }, 'magic'),
      ]),
    ]),
}

// /assets/index.js
module.exports = {
  // ...other assets
  Footer: require('./Footer'),
}
`),

    h2('list of installable magic modules'),
    ul([
      li([
        h3('pre'),
        div(
          'the pre magic module allows you to display javascript code with syntax highlighting. it is used throughout this documentation.',
        ),
        Link({ to: 'https://github.com/magic-modules/pre' }, '@magic-modules/pre'),
      ]),
    ]),
  ],
}
