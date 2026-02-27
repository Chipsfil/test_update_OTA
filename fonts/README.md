# Custom Fonts

This folder contains custom fonts for the Electron OTA Test application.

## How to Add Custom Fonts

1. Add your font files (.ttf, .woff, .woff2, .otf) to this folder
2. Reference them in `style.css` using the `@font-face` rule:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('../fonts/your-font.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'CustomFont', sans-serif;
}
```

## Font Formats Supported

- TTF (TrueType Font)
- OTF (OpenType Font)
- WOFF (Web Open Font Format)
- WOFF2 (Web Open Font Format 2)

## Example Fonts

Place your custom font files here and uncomment the @font-face declarations in style.css.

Common free font sources:
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)
- [DaFont](https://www.dafont.com/)

## Package Information

When building the application with electron-builder, ensure fonts are included in the `files` array in package.json:

```json
"files": [
  "fonts/**/*"
]
```

This is already configured in the current package.json.
