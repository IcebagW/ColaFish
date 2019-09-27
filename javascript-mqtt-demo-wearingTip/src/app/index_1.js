'use strict'
const path =require('path');
const views=require('koa-views');
const Koa = require('koa');
const mqtt = require('mqtt');
const app = new Koa();

var msg = {temperature:"-",tips:""};
// response
app.use(views(path.join(__dirname,'./view'),{extension:'ejs'}));
const main= async ctx=>{
		
	  await ctx.render('index',(msg))
}
//app.use(ctx => {
 // ctx.body = "当前水温:" + msg.temperature + "度" + "\n" + '控制:'+msg.tips + "\n"  ;
//});
app.use(main)
app.listen(3000);

//mqtt
var client  = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
   console.log('>>> connected');
   client.subscribe('/contral');
})

client.on('message', function (topic, message) {
  var data = JSON.parse(message.toString());
  console.log(message.toString()); 
  console.log(data.tips); 
  msg = data;
  
  // if (temperature+1) {}
  // message is Buffer
  // let str = message.toString();
  // let data = JSON.parse(message);
  // console.log(data.tips);
  // msg =  message.toString();
})
