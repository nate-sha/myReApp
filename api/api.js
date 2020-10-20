require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
var compression = require('compression');
var helmet = require('helmet');
// const logger = require('./middleware/Logger');
app.use(helmet());
app.use(compression());
app.use(cors());
//Db Conn
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const dbfetch = mongoose.connection;

// Logger;
// app.use(logger);
//Body Parsers
app.use(express.json());

//Routes
app.use('/api/members', require('./routes/members'));
app.use('/api/languages', require('./routes/languages'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/clinics', require('./routes/clinics'));
app.use('/api/agencyReqs', require('./routes/table-AgencyReq'));

app.get('/', (req, res) => {
  res.json({ msg: 'Hello' });
});

//Listen to port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
