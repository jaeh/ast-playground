const Footer = {
  View: () =>
    footer({ class: 'main' }, [
      div({ class: 'wrapper' }, [
        `© ${new Date().getFullYear()} - made with a few bits of `,
        a({ href: 'https://github.com/magic/core', target: '_blank', rel: 'noopener' }, 'magic'),
      ]),
    ]),
}

module.exports = Footer
