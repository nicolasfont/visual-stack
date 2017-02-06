const express = require('express');
const morgan = require('morgan');
const app = express();
app.set('port', (process.env.API_PORT || 3001));
app.use(morgan('tiny'));
app.use(express.static('build'));
app.listen(app.get('port'), () => {
  console.log(`Server running at: http://localhost:${app.get('port')}/`); // eslint-disable-line
});
