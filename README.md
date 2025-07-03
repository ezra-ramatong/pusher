# 🎨 Pusher - Design Diff Browser Extension

**Pusher** is a pixel-perfect design implementation tool that allows developers to overlay design mockups over live websites with an interactive draggable slider. Perfect for ensuring your implementation matches the original design exactly.

[![GitHub release](https://img.shields.io/github/release/ezra-ramatong/pusher.svg?include_prereleases)](https://github.com/ezra-ramatong/pusher/releases/latest)

## Manual Installation

- [**Chrome**](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)
- [**Firefox**](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)

## Usage

![Demo](./assets/demo.gif)

1. **Navigate to your target website** (localhost or any URL)
2. **Click the Pusher extension icon** in your browser toolbar
3. **Select your design mockup** using the file picker (bottom-right corner)
4. **Use the draggable slider** to compare your implementation with the design
5. **Make adjustments** to your code to achieve pixel-perfect matching

### File Structure

```
dist/
├── manifest.json
├── content.js
├── style.css
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

## Security Notes

This extension requires broad permissions to work on any website. Only install from trusted sources and review the code before installation.

---

**Live life dance life!** 🎨
