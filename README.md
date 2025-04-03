# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Plagiarism Split Checker

This application helps check plagiarism in large documents by splitting them into smaller chunks that can be processed by free plagiarism checking services.

## Features

- Upload and process .txt, .docx, and .pdf files
- Extract text content automatically
- Split text into chunks of customizable size (default: 1000 words)
- Easy copy-to-clipboard functionality for each chunk
- Calculate weighted average plagiarism percentage based on chunk size

## Automatic Checking (Experimental)

The application includes a demonstration of how automatic checking with services like DupliChecker could work. However, a complete implementation would require:

### Server-Side Implementation

To fully implement automatic checking with plagiarism services, you would need:

1. **Backend Server**: Create a Node.js, Python, or other server that can:
   - Receive text chunks from the frontend
   - Submit them to plagiarism checking services
   - Parse the results and return them to the frontend

2. **Web Scraping**: Use libraries like Puppeteer (Node.js) or Selenium (Python) to:
   - Navigate to the plagiarism checking service
   - Input the text content
   - Submit the form
   - Wait for results
   - Extract the plagiarism percentage from the page

3. **CAPTCHA Handling**: Many plagiarism services use CAPTCHA to prevent automation. Options include:
   - Manual CAPTCHA solving integration
   - CAPTCHA solving services (with ethical considerations)
   - Rate limiting your requests to avoid triggering CAPTCHA

4. **Rate Limiting & IP Rotation**: To avoid getting blocked:
   - Implement delays between requests
   - Potentially use IP rotation if necessary
   - Respect the website's robots.txt and terms of service

### Example Server Implementation (Conceptual)

```javascript
// Node.js example with Express and Puppeteer
const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.use(express.json());

app.post('/check-plagiarism', async (req, res) => {
  const { text } = req.body;
  
  try {
    const result = await checkPlagiarism(text);
    res.json({ success: true, percentage: result });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

async function checkPlagiarism(text) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to DupliChecker
    await page.goto('https://www.duplichecker.com/');
    
    // Fill the text input
    await page.type('#textArea', text);
    
    // Click check button
    await page.click('#btnCheck');
    
    // Wait for results to load
    await page.waitForSelector('.result-text', { timeout: 60000 });
    
    // Extract percentage from the results page
    const percentage = await page.evaluate(() => {
      const resultText = document.querySelector('.result-text').innerText;
      const match = resultText.match(/(\d+(\.\d+)?)%/);
      return match ? parseFloat(match[1]) : 0;
    });
    
    return percentage;
  } finally {
    await browser.close();
  }
}

app.listen(3001, () => {
  console.log('Plagiarism checking server running on port 3001');
});
```

### Legal and Ethical Considerations

Before implementing automatic checking, consider:

- Review the Terms of Service of plagiarism checking websites
- Understand fair use policies and rate limiting
- Implement proper delays to avoid overloading the services
- Consider purchasing API access if the service offers it

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Start the application
```bash
npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
