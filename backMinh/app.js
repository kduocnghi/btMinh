const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const data = require('ttn').app;
const ttn = require("ttn");
const fs = require('fs');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'weather_data'
});
const appID = "intelligentirrigration";
const accessKey = "ttn-account-v2.JSO6Y17HgEGg3n_3V8rApfJZGa3gkKyru7cozkhPa8o";

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
 
app.use(cors());



// Delete post
app.get('/getData/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

const server = require('http').Server(app);
const io = require('socket.io')(server);


server.listen(81);
// WARNING: app.listen(81) will NOT work here!

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});

// Select posts
app.get('/get_init_weather_data', (req, res) => {
  let sql = 'SELECT * FROM weather_measurement order by id desc limit 50';
  let query = db.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
  });
});

// Select posts
app.get('/get_chart_info', (req, res) => {
  let sql = 'select cast(time_created_at as date) as date_x, avg(temperature_1) as temp_avg, avg(relative_humidity_2) as humidity_avg, dev_id from weather_measurement group by cast(time_created_at as date), dev_id';
  let query = db.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results);
  });
});



// discover handler and open mqtt connection
ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)
      weather_data = {
        app_id: payload.app_id,
        dev_id: payload.dev_id,
        hardware_serial: payload.hardware_serial,
        port: payload.port,
        counter: payload.counter,
        digital_in_4: payload.payload_fields.digital_in_4,
        digital_out_3: payload.payload_fields.digital_out_3,
        relative_humidity_2: payload.payload_fields.relative_humidity_2,
        temperature_1: payload.payload_fields.temperature_1,
        time_created_at: payload.metadata.time,
        frequency: payload.metadata.frequency,
        modulation: payload.metadata.modulation,
        data_rate: payload.metadata.data_rate,
        airtime: payload.metadata.airtime,
        coding_rate: payload.metadata.coding_rate,
        latitude: payload.metadata.latitude,
        longitude: payload.metadata.longitude,
      };
      let sql = 'INSERT INTO weather_measurement SET ?';
      let query = db.query(sql, weather_data, (err, result) => {
          if(err) throw err;
          console.log(result);
          io.sockets.emit('save_data', weather_data);
      });
    })
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })
 
// discover handler and open application manager client
ttn.application(appID, accessKey)
  .then(function (client) {
    return client.get()
  })
  .then(function (app) {
    console.log("Got app", app)
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
});