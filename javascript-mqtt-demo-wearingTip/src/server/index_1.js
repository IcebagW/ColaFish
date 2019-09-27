'use strict'

const mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
   console.log('>>> connected');
   client.subscribe('/temperature');
})

client.on('message', function (topic, message) {
  var temperature = parseInt(message.toString());
  var data = {temperature};

  if (temperature >= 50) {
  		data.tips = "停止加热,您的鱼熟了";
  }
  else {
  		data.tips = "开启加热,稍等片刻";
  }

  client.publish('/contral', JSON.stringify(data));
  // if (temperature+1) {}
  // message is Buffer
  console.log(JSON.stringify(data));
})
