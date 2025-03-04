# CGPA Calculator Chrome Extension

This Chrome extension allows students to calculate their **CGPA** directly from their college results webpage (`https://results.bmsce.in`). It automatically adds input fields for **credit values**, retrieves **grades** from the results table, and calculates the CGPA when the user clicks the **Calculate CGPA** button.

## 📂 Project Structure

```
CGPAEXTENSION/
│── frontend/
│   ├── hello.html       # Extension frontend (if applicable)
│   ├── styles.css       # Styling for the extension UI
│── images/
│   ├── icon.png         # Extension icon
│── scripts/
│   ├── content.js       # Main script that interacts with the webpage
│── manifest.json        # Chrome extension configuration
```

## 🚀 Features

- **Auto-detects the results table** on the webpage.
- **Adds input fields for credit values** beside each subject.
- **Maps grades to grade points** based on a predefined scale.
- **Calculates CGPA** when the button is clicked.
- **Displays CGPA next to the button**.

## ⚙️ Technologies Used

- **JavaScript** - Content scripts for DOM manipulation.
- **MutationObserver API** - For tracking page updates efficiently.
- **Chrome Extensions API** - To interact with the results webpage.


## 🛠 Installation

1. **Clone or Download** this repository.
2. Open **Google Chrome** and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (top right corner).
4. Click **Load Unpacked** and select the project folder.
5. The extension will now be added to Chrome.

## 📌 How to Use

1. Open your results page: [BMSCE Results](https://results.bmsce.in)
2. The extension will automatically add **credit input fields** beside each subject.
3. Enter the respective **credit values** for each subject.
4. Click **Calculate CGPA**.
5. The **calculated CGPA** will appear next to the button.

## 🔧 Grade to Grade-Point Mapping

| Grade | Grade Point |
|--------|-------------|
| O      | 10          |
| A+     | 9           |
| A      | 8           |
| B+     | 7           |
| B      | 6           |
| C      | 5           |
| P      | 4           |
| F      | 0           |

## 📜 Manifest.json Overview

This file configures the Chrome extension:

```json
{
  "manifest_version": 3,
  "name": "CGPA Calculator",
  "version": "1.0",
  "description": "Calculate CGPA directly from your results page",
  "permissions": ["activeTab"],
  "content_scripts": [
    {
      "matches": ["https://results.bmsce.in/*"],
      "js": ["scripts/content.js"],
      "css": ["frontend/styles.css"]
    }
  ],
  "icons": {
    "16": "images/icon.png",
    "48": "images/icon.png",
    "128": "images/icon.png"
  }
}
```

## 🤝 Contributing
Feel free to fork this repository and submit pull requests if you want to improve the extension.

## 📄 License
This project is open-source and available under the **MIT License**.

