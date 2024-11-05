const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get donation data
app.get('/donations', (req, res) => {
  exec('node scrape.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing fetch script: ${error}`);
      return res.status(500).send('Error fetching donations');
    }
    res.json(JSON.parse(stdout));
  });
});

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
