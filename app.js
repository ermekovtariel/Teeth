const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


const PORT = config.get('port') || 5000;

app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/user.routes'));


async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`app has started ${PORT}`));
  } catch (e) {
    console.log('server Error', e.message);
    process.exit(1);
  }
}
start();
// Жылдыз