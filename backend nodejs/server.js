const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: '*', optionSuccessStatus: 200}))

app.use(express.json());

app.use('/api', require('./routes/index'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});