# ⏰ Clock Extension 

Browser extension providing multi-functional timekeeping capabilities.

## Features
- Real-time analog/digital clock toggle
- Auto timezone detection (IP-based)
- Manual timezone override (+/- 12hr UTC)
- Theme engine (dark/light/custom CSS)
- Browser action popup with quick settings
- Background sync with NTP servers

## Installation
```bash
# For development
git clone https://github.com/yourusername/Web-Projects.git
cd Web-Projects/clock-extension

# Load unpacked extension in:
# Chrome → chrome://extensions → "Load unpacked"
# Firefox → about:debugging → "This Firefox" → "Load Temporary Add-on"
```

### Manual Installation (Without Bash)

1.  **Download the extension files:** Download the files from this repository by clicking "Code" -> "Download ZIP".
2.  **Extract the ZIP file:** Extract the downloaded ZIP file to a location on your computer.
3.  **Open Chrome Extensions Page:** In Chrome, go to `chrome://extensions`.
4.  **Enable Developer Mode:** In the top right corner, toggle the "Developer mode" switch to ON.
5.  **Load Unpacked Extension:** Click the "Load unpacked" button in the top left corner.
6.  **Select the extension directory:** Browse to the directory where you extracted the ZIP file and select the `clock-extension` folder.
7.  **The extension is now installed:** The Clock Extension should now be installed and enabled in your Chrome browser.

## API Usage
```javascript
// Access clock instance
const worldClock = {
  getCurrentTime: (tz) => chrome.runtime.sendMessage({ 
    action: 'getTime', 
    timezone: tz 
  }),
  
  setTheme: (theme) => chrome.storage.local.set({ activeTheme: theme })
};
```

## Contribution Guidelines
1. Fork repository
2. Create feature branch (`git checkout -b feature/clock-enhancement`)
3. Maintain existing manifest version (3.0.0)
4. Submit PR with before/after screenshots

## Technical Stack
- Service Workers (background sync)
- Web Components (shadow DOM clock)
- chrome.storage API (persistent settings)
- Intl.DateTimeFormat (timezone handling)