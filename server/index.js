require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const db = require('./configs/database');
const userAPIs = require('./views/UsersViews');
const jobAPIs = require('./views/JobsViews');
const applicationAPIs = require('./views/ApplicationsViews')

app.use(cors());
app.use(express.json());
app.use('/api/users', userAPIs);
app.use('/api/jobs', jobAPIs);
app.use('/api/applications', applicationAPIs);

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

(async () => {
  try {
    await db.authenticate();
    console.log('Database connected!');

    // await db.sync({ alter: true }); chỉ dùng khi thay đổi model
    await db.sync(); 
    console.log('Database synced!');

    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000');
    });
  } catch (error) {
    console.error('Unable to connect or sync DB:', error);
  }
})();
