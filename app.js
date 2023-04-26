const express = require('express');
const app = express();
const port = 3000;

const checkTime = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hour = date.getHours();
  
  if (dayOfWeek > 0 && dayOfWeek < 6 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('Sorry, the website is only available during working hours (Monday to Friday, from 9 to 17)');
  }
};

app.use(express.static('public'));

app.use(checkTime);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/public/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
