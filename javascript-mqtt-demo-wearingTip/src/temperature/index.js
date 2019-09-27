

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');
var tem=0;

function GetRandomNum(Min,Max){
  var Range = Max - Min;
  var Rand = Math.random();
  return(Min + Math.round(Rand * Range));
}

client.on('connect', function () {
   console.log('>>> connected');
   // client.subscribe('/tips')
  setInterval( 
   		function(){
   
   tem=GetRandomNum(10,20);
   client.publish('/temperature',toString(tem));
   console.log(toString(tem))},
   		2000
   	);
   
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
})
client.end();
