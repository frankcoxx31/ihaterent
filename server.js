const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/properties', (req, res) => {
  const properties = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'properties.json'), 'utf8'));
  res.json(properties);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`HAVEN running at http://localhost:${PORT}`);
});
