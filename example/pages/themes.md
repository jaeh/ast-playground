---
@state {
  "title": "@magic-themes",
  "description": "@magic-theme docs."
}
---

# @magic-themes

magic themes are themes for magic apps.
you decide which theme to load by specifying the theme name in config.THEME

<Pre>
// /config.mjs
export default {
  // ...rest of config,
  THEME: 'blue',
}
</Pre>

## theme load order

themes get loaded from multiple places. last in the list overwrites earlier entries.

<Pre>
// ...default module styles get inserted here
/node_modules/@magic/core/src/themes/THEME/index.mjs
/node_modules/@magic-themes/THEME
/assets/themes/THEME/index.mjs
</Pre>

<ThemeList></ThemeList>
