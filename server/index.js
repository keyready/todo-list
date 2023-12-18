const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../build/index.html'));
})

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhot:${port}`);
});
