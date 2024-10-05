const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const shipments = [];

app.get('/', (req, res) => {
  res.send("Hello, Shipment Tracker! Server is running.")
})

app.get('/shipments', (req, res) => {
  res.send(shipments);
})

app.get('/api/tracking/:shipmentId', (req, res) => {
  const shipmentId = req.params.shipmentId;
  // use res to build out new object
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})