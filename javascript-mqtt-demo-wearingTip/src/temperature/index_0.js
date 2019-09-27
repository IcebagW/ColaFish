var mqtt =require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');
var tem=10;

function GetRandomNum(Min,Max){  
  var Range = Max - Min;  
  var Rand = Math.random();  
  return(Min + Math.round(Rand * Range));  
}  
client.on('connect', function () {
   console.log('>>> connected')
   // client.subscribe('/tips')
   setInterval(
   		()=>{client.publish('/temperature', GetRandomNum(0,100).toString());},
   		500
   	);
   
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
})

// client.end();
