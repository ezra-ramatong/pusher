# Pusher - Design Diff Browser Extension

**Pusher** is a pixel-perfect design implementation tool that allows developers to overlay design mockups over live websites with an interactive draggable slider. Perfect for ensuring your implementation matches the original design exactly.

## Why I find it useful

- Screenshot and overlay design mockups on any website
- Interactive draggable slider for side-by-side comparison
- Pixel-perfect design matching
- Works on localhost and any website
- Lightweight and fast

## Manual Installation

### Chrome Setup

1. **Download/Clone the Extension**

   - Ensure you have all extension files in a folder (manifest.json, content.js, style.css, etc.)

2. **Enable Developer Mode**

   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle **Developer mode** ON (top-right corner)

3. **Load the Extension**

   - Click **Load unpacked** button
   - Select the folder containing your extension files
   - The extension should now appear in your extensions list

4. **Pin the Extension** (Optional)
   - Click the puzzle piece icon in the toolbar
   - Find "Pusher" and click the pin icon to keep it visible

### Firefox Setup

1. **Download/Clone the Extension**

   - Ensure you have all extension files in a folder

2. **Access Debug Mode**

   - Open Firefox and navigate to `about:debugging`
   - Click **This Firefox** in the left sidebar

3. **Load Temporary Extension**

   - Click **Load Temporary Add-on**
   - Navigate to your extension folder and select `manifest.json`
   - The extension will be loaded temporarily (until Firefox restart)

4. **For Permanent Installation** (Development)
   - For permanent installation during development, you'll need to:
     - Set `xpinstall.signatures.required` to `false` in `about:config`
     - Package the extension as an XPI file
     - Note: This disables signature verification (development only)

## Usage

1. **Navigate to your target website** (localhost or any URL)
2. **Click the Pusher extension icon** in your browser toolbar
3. **Select your design mockup** using the file picker (bottom-right corner)
4. **Use the draggable slider** to compare your implementation with the design
5. **Make adjustments** to your code to achieve pixel-perfect matching

> I should probably add a Drag and drop functionality for even easier image loading.

## Development Notes

### File Structure

```
pusher-extension/
├── manifest.json
├── content.js
├── style.css
└── [other extension files]
```

### Permissions Explained

- `activeTab`: Allows the extension to access the currently active tab
- `scripting`: Enables content script injection for overlay functionality

### Content Script Scope

- Runs on `localhost/*` for local development
- Runs on `<all_urls>` for testing on any website

## Troubleshooting

### Chrome Issues

- **Extension not loading**: Check console for manifest errors
- **No permissions**: Ensure you've granted necessary permissions
- **Not working on HTTPS sites**: Check mixed content settings

### Firefox Issues

- **Temporary extension disappeared**: Reload in `about:debugging`
- **Manifest v3 compatibility**: Ensure Firefox version supports Manifest v3
- **Content script not injecting**: Check browser console for errors

### General Issues

- **Slider not appearing**: Check if content.js and style.css are properly loaded
- **Images not loading**: Verify CORS policies for external image URLs
- **Performance issues**: Check for JavaScript errors in browser console

## Browser Compatibility

- **Chrome**: Version 88+ (Manifest v3 support)
- **Firefox**: Version 109+ (Manifest v3 support)
- **Edge**: Version 88+ (Chromium-based)

## Development Tips

1. **Hot Reloading**: After making changes, click the refresh icon next to your extension in the extensions page
2. **Debugging**: Use browser developer tools to debug content scripts
3. **Console Logging**: Check both the extension console and page console for different types of logs
4. **File Permissions**: Ensure all files have proper read permissions

## Security Notes

This extension requires broad permissions to work on any website. Only install from trusted sources and review the code before installation.

---

**Live life dance life!** 🎨
