const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// import rute carti
const cartiRoutes = require('./routes/carti');
app.use('/carti', cartiRoutes);

app.listen(port, () => {
  console.log(`Server pornit pe http://localhost:${port}`);
});
