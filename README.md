# Electron OTA Test Application

A simple Electron application designed to test Over-The-Air (OTA) updates using GitHub releases and `electron-updater`.

## Project Structure

```
electron-ota-test/
├── main.js              # Electron main process
├── preload.js           # Preload script for secure IPC
├── renderer.js          # Renderer process script
├── index.html           # Home page
├── page2.html           # Settings page
├── style.css            # Application styles
├── package.json         # Project configuration
├── assets/              # Logo and images
│   └── logo.png         # Application logo (SVG)
├── fonts/               # Custom fonts folder
│   └── README.md        # Font usage instructions
└── README.md            # This file
```

## Features

- ✅ Automatic update checking on application startup
- ✅ Manual update checking via button
- ✅ Background update downloading
- ✅ One-click installation with app restart
- ✅ GitHub releases integration via electron-updater
- ✅ Error handling and status notifications
- ✅ Multi-page navigation
- ✅ Custom styling with gradient background
- ✅ Responsive UI with animations

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- GitHub account and repository

## Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

3. Update GitHub information in `package.json`:

```json
"homepage": "https://github.com/yourusername/electron-ota-test",
"build": {
  "publish": {
    "provider": "github",
    "owner": "yourusername",
    "repo": "electron-ota-test"
  }
}
```

## Running the Application

### Development Mode

```bash
npm start
```

This will launch the Electron application with DevTools available for debugging.

### Building the Application

Build for your current platform:

```bash
npm run build
```

Build for specific platform:

```bash
npm run build -- --mac      # macOS
npm run build -- --win      # Windows
npm run build -- --linux    # Linux
```

### Publishing to GitHub

To enable OTA updates, publish your build to GitHub:

```bash
npm run publish
```

This will build the application and automatically create a GitHub release with the necessary files.

**Requirements:**
- GitHub repository must be public
- `GITHUB_TOKEN` environment variable should be set for automated releases
- Repository name and owner must match those in `package.json`

## Testing OTA Updates

### Step-by-Step Guide

1. **Initial Setup:**
   - Create a GitHub repository named `electron-ota-test`
   - Update the repository URL in `package.json`
   - Set version to `1.0.0` in `package.json`

2. **First Release:**
   ```bash
   npm run publish
   ```
   This creates a draft release. Publish it manually on GitHub.

3. **Update the App:**
   - Change the version in `package.json` to `1.1.0`
   - Make some visible changes (e.g., update text in index.html)
   - Save changes

4. **Create Second Release:**
   ```bash
   npm run publish
   ```
   Publish the new release on GitHub.

5. **Test the Update:**
   - Install the first version (v1.0.0) on your computer
   - Run the application
   - It will automatically check for updates and find v1.1.0
   - The application will download the update
   - Click "Check Updates" or wait for the notification
   - Click the install button to apply the update
   - The application will restart with the new version

### What Gets Installed

When you run `npm run publish`, electron-builder creates:
- Application installer/package for your platform
- `latest.yml` - Contains update metadata
- `latest-mac.yml` (for macOS)
- `latest-linux.yml` (for Linux)
- `latest.json` (for Windows)

All these files are required for `electron-updater` to work correctly.

## Architecture

### Main Process (main.js)
- Creates and manages the application window
- Initializes the auto-updater
- Handles IPC messages for update control
- Creates menu bar with standard options

### Preload Script (preload.js)
- Exposes safe IPC methods to renderer process
- Bridges main and renderer processes securely
- Provides update control methods
- Implements context isolation

### Renderer Process (renderer.js)
- Handles UI interactions
- Manages page navigation
- Displays update status
- Calls main process methods via IPC

## electron-updater Configuration

The app uses `electron-updater` with the following settings:

```javascript
autoUpdater.checkForUpdatesAndNotify();  // Check on startup
// Auto-download enabled by default
// Quit and install when update is ready
```

## Troubleshooting

### Updates Not Being Detected
- ✓ Verify GitHub repository URL in `package.json`
- ✓ Check that releases are published (not drafts)
- ✓ Ensure new version number is higher than current
- ✓ Verify release contains all necessary assets (including .yml/.json)

### Build Fails
- ✓ Ensure all dependencies are installed: `npm install`
- ✓ Check that you have write permissions to the project directory
- ✓ For Windows builds on macOS (or vice versa), additional tools may be needed

### Application Won't Update
- ✓ Check that the app has write permissions to its installation directory
- ✓ Ensure GitHub repository is public
- ✓ Open DevTools (Developer Tools) to see detailed error messages
- ✓ Check application logs for electron-updater messages

### Opening DevTools
The application has DevTools commented out in `main.js`. To enable:

In `main.js`, uncomment:
```javascript
mainWindow.webContents.openDevTools();
```

Or press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (macOS) at runtime.

## Environment Variables

For automated GitHub publishing, set:

```bash
export GITHUB_TOKEN=your_github_personal_access_token
```

Create a personal access token with `public_repo` scope at https://github.com/settings/tokens

## Security Considerations

- Context isolation is enabled (`contextIsolation: true`)
- Node integration is disabled (`nodeIntegration: false`)
- Only safe methods are exposed via preload script
- All IPC messages are validated

## File Sizes

After building, the application size depends on your platform:
- macOS: ~150-200MB
- Windows: ~200-250MB
- Linux: ~150-200MB

## Customization

### Adding Custom Fonts
1. Add font files to `fonts/` folder
2. Reference in `style.css` using `@font-face`
3. See `fonts/README.md` for examples

### Changing Styling
Edit `style.css` to customize:
- Colors (currently using purple gradient)
- Fonts and typography
- Spacing and layout
- Animations

### Modifying Pages
Edit `index.html` and `page2.html` to add:
- New menu items
- Additional settings
- Custom content

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [electron-updater](https://www.electron.build/auto-update)
- [electron-builder](https://www.electron.build/)
- [GitHub Releases API](https://docs.github.com/en/rest/releases)

## License

MIT

## Support

For issues or questions:
1. Check this README and troubleshooting tips
2. Check [Electron documentation](https://www.electronjs.org/docs)
3. Review [electron-updater issues](https://github.com/electron-userland/electron-builder/issues)
4. Check your GitHub repository settings and releases
