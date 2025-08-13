require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./configs/database');
const userAPIs = require('./views/UsersViews')

app.use(express.json());
app.use('/api', userAPIs);

app.get('/api', (req, res) => {
  res.send('Hello Express!');
});

(async () => {
  try {
    await db.authenticate();
    console.log('Database connected!');

    await db.sync({ alter: true });
    console.log('Database synced!');

    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000');
    });
  } catch (error) {
    console.error('Unable to connect or sync DB:', error);
  }
})();
