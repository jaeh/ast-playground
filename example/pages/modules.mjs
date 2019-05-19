export const state = {
  title: '@magic-modules',
  description: '@magic-modules documentation.',
}

export const View = state => [
  h1(state.title),
  p('magic modules are predefined modules for webapps.'),

  h2({ id: 'definition' }, 'module definition:'),
  p('the minimal module is a function that returns some html.'),
  Pre(`
// /assets/ModuleName.mjs

// simplest module
export const View = () => div('hello, world')

// complete signature
export const View = (props = {}, children = []) => div('hello, world')
`),

  h2({ id: 'usage' }, 'usage'),
  p([
    'if the npm package name starts with @magic-modules/ or magic-module-, it will get imported automagically.',
    ' the name of the Module will be set to a PascalCased version of the remainder of the module name',
    ' for example, @magic-modules/git-badges turns into GitBadges.',
    ' the same is true for all uppercased files in your /assets directory.',
    ' in the rare case where you want to install a npm module that can not be found, you can import it in /assets/index.mjs',
  ]),
  Pre(`
// /assets/index.mjs
export default {
  // ...otherModules

  // load module from node_modules
  NpmModule: require('not-standard-named-magic-module-from-npm'),
}`),
  p(
    'after this, the module will be a global in your app and can be used like any other component.',
  ),

  Pre(`
// any page or module
export default () => div([
  'modules that do not need props can be used without calling them as a function ',
  Mod,
  'modules that need props: ',
  Mod(propObject),
`),

  h2({ id: 'custom-module' }, 'Mod and Mod.Component:'),

  Mod(state),

  Mod.Component({ title: 'Mod Component Title, passed via props' }),

  h3('Mod sourcecode:'),

  Pre(`const Mod = {
export const View = state =>
  div({ class: 'Mod View' }, [
    h3('Mod.View'),
    p([
      'this is Mod.View. it gets loaded from ',
      Link({
        to: 'https://github.com/magic/core/blob/master/example/assets/Mod.mjs',
        text: '/assets/Mod.mjs'
      }),
    ]),
    p([
      'and imported in ',
      Link({
        to: 'https://github.com/magic/core/blob/master/example/assets/index.mjs',
        text: '/assets/index.mjs',
      }),
    ]),
    p(['the state of this module: ', JSON.stringify(state.module)]),
  ]),

  Component: () =>
    div({ class: 'Mod Component' }, [
      h3('Mod.Component'),
      p([
        'Mod.Component, a second component in ',
        Link({
          to: 'https://github.com/magic/core/blob/master/example/assets/Mod.mjs',
          text: '/assets/Mod.mjs',
        }),
      ]),
    ]),

  state: {
    module: {
      test: 'testing',
    },
  },

  style: {
    '.Mod': {
      margin: '0 0 1em',
      padding: '0.5em',
      border: '1px solid',

      h3: {
        margin: 0,
      },

      '&.View': {
        borderColor: 'green',
      },
      '&.Component': {
        borderColor: 'red',
      },
    },
  },

  global: {
    state: {
      module: true,
    },
  },
}

export default Mod`),

  h2({ id: 'check-props' }, 'check props'),
  p('@magic-modules can export a .props key with an array of prop types.'),
  p('more docs coming soon'),

  h2({ id: 'preinstalled' }, 'preinstalled magic modules'),
  p('magic has some preinstalled modules that will be used in most pages.'),

  h2({ id: 'app' }, 'app'),
  p(
    'this is the main app module. it has magically inherited properties and all of it is customizable.',
  ),
  p([
    'to add actions/state/style to the app you can just create an /assets/app.mjs file.',
    'the contents of this file get ',
    Link({ to: 'https://github.com/magic/deep', text: 'deep .merged' }),
    ' into the app',
  ]),
  Pre(`
// /assets/app.mjs
export const state = {
  merge: 'gets merged into state',
}
export const actions = {
  mergedActions: () => ({ merge: 'merged action executed' }),
}
export const style = {
  body: {
    backgroundColor: 'white',
  },
}
`),

  h2({ id: 'menu' }, 'menu'),
  p('the Menu module provides... menus.'),
  p([
    'just pass it a string which is the state key of the menu,',
    ' then add that menu to the /assets/app.mjs file.',
  ]),
  p([
    'by default, the menu will only show submenu items if their parent link is active.',
    ' to force submenu items to show at all times, just pass a collapse: false prop',
  ]),
  Pre(`
// assets/app.mjs
export default {
  state: {
    // ...state
    menuName: [
      { to: '/example-page', text: 'example page' },
      { to: 'https://example.com', text: 'example.com' },
      { to: 'https://example.com', nofollow: true, noreferrer: true, target: 'utopia', text: 'nofollow and noref" },
    ],
  },
  // ... rest of app.mjs
}`),

  p('then, in a page or module'),
  Pre(`
export default () => Menu({ name: 'menuName', collapse: false })

// output:
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

  h3({ id: 'menu-props' }, 'Menu props'),
  p('the Menu module allows multiple props to be passed when instantiating the Menu'),

  Pre(`
Menu({
  collapse: false, // (default: true) menu will always show all submenu items
})`),

  h3({ id: 'menu-item-props' }, 'Menu.Item props'),
  p([
    'every MenuItem accepts props the same props as a link does.',
    ' additionally a MenuItem accepts a items prop with sub menu items.',
  ]),

  Pre(`
const menuItem = ({
  to: '/url',
  text: 'link text',
  items: [SubMenuItems],
  noreferrer: true, // set rel='noreferer'
  nofollow: true, // set rel='nofollow'
})`),

  h3({ id: 'menu-sub-menus' }, 'sub menus'),
  p('to define a submenu, simply define a .items array on the menu item'),
  Pre(`
// assets/app.mjs
export default {
  state: {
    // ...state
    menuName: [
      {
        to: '/example-page',
        text: 'example page',
        items: [
          { to: '/example-page/#sub', text: 'example sub page' },
      ] },
    ],
  },
  // ... rest of app.mjs
}`),

  h2({ id: 'link' }, 'link'),
  p('the link module allows you to link to things.'),
  Pre(`
// in any page or module View
export default () => [
  Link({ to: '/page', text: 'page' }),
  // output: <a href="/page" onclick="actions.go">page</a>
  Link({ to: 'https://example.com', text: 'page' }),
  // output: <a href="https://example.com" target="_blank" rel="noopener">page</a>
  Link({ to: '/page', text: 'page', nofollow: true, noreferrer: true }),
  // output: <a href="https://example.com" target="_blank" rel="nofollow noreferrer noopener">page</a>

  // you can also use children syntax instead of the text prop:
  Link({ to: '/' }, 'home'),

  // Link also supports # hash links
  Link({ to: '/#hash' }, 'home with hash'),
]`),

  h2({ id: 'img' }, 'img'),
  p('the img module adds some sane default values to your images.'),
  Pre(`
// in any page or module View
export default () => [
  Img('/image.png'),
  // output: <img src="/image.png" alt="" role="presentation"/>
  Img({ src: '/image.png }),
  // output: <img src="/image.png" alt="" role="presentation"/>
  Img({ src: '/image.png', alt: 'image description' }),
  // output: <img src="/image.png alt="image description" />
  Img({ src: '/image.png', title: 'image title', }),
  // output: <img src="/image.png" title="image title" alt="image title"/>
  Img({ src: '/image.png', title: 'image title', alt: 'image alt' }),
  // output: <img src="/image.png" title="image title" alt="image alt"/>
]`),

  h2({ id: 'footer' }, 'footer'),
  p('the footer module contains a small info text and a link to the magic github repository.'),
  p(
    'to overwrite this behaviour, just place a Footer.mjs file in your assets and require it in /assets/index.mjs.',
  ),
  Pre(`
// /assets/Footer.mjs:
const Footer = () =>
footer({ class: 'main' }, [
  div({ class: 'wrapper' }, [
    'made with a few bits of ',
    Link({ href: 'https://github.com/magic/core', target: '_blank', rel: 'noopener' }, 'magic'),
  ]),
])

Footer.style: {
  'footer.main': {
    position: 'relative',
    textAlign: 'center',
    padding: '5em 0 .5em',
  },
}

export default Footer
`),

  ModuleList(),
]

export default {
  state,
  View,
}