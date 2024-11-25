const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const html = fs.readFileSync('index.html', 'utf-8');
  res.send(html);
});

app.post('/save', (req, res) => {
  const data = req.body.data;
  const filetype = req.body.filetype;
  const fileName = req.body.filename;

  const filename = `${fileName}_${Date.now()}.${filetype}`;

  // Save the file into a folder named "files"
  const folderPath = path.join(__dirname, 'files');
  const filePath = path.join(folderPath, filename);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error(err);
      res.send('Error occurred while saving the file.');
    } else {
      console.log(`File saved successfully!`);
      res.send(`File saved successfully! click <a href="http://localhost:3000">here</a> to go back `);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});