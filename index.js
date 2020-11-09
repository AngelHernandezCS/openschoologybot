/*
This is Version 1 of schoology assignment bot. Im just a beginner in coding and i barely know what im doing. Anyways i do not know how discord bots work when they are in multiple servers so this only works on an individual basis

Thanks to Sheepmaster for being the one to figure out the schoolgy api 
*/

//SHOULD I PUT COMMENTS???? FUCK NO

//schoology stuff
const askSgy = require('./get-things-from-schoology.js')
const fs = require('fs').promises
//var assignments = require('./assignments.json')
var startingAssignments;
var today = false;
var tomorrow = false

const min = 0x00AE
const max = 0x0377
var god,test;


var todayassignment = false;
var tomorrowassignment = false;

//discord bot stuff
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const { isRegExp } = require('util');
const client = new Discord.Client();

var channel;

client.on('ready', () => {
  console.log('Im ready');
  channel = client.channels.cache.get('752587521921122326');
  
    //Main();
});

client.login(process.env.TOKEN);

client.on('message',msg => {
if(msg.content == "+Renow"){
  today = true;
  tomorrow = false;
  getStarterassignments();
  }

if(msg.content == "+Relater"){
  tomorrow = true;
  today = false;
  getStarterassignments();
  }
})


function truncate(str,x, n){
  return (str.length >= n) ? str.substr(x, n)  : str;
};

// 55610840


 

//Creates Json file with assignments info of specific class and stores total assignments in a variable 
async function getStarterassignments(){
  let start = 0;
  let limit = 20;
  let capped = false

  var dueDates =  [];
  var dueTimes = [];
  var dueMonth = [];
  var dueDay = [];

  var d = new Date();
  var currentMonth = d.getMonth() + 1;
  var currentDay = d.getDate();

  var god = await askSgy('/sections/2535704616/assignments?start=' + start + '&limit=' + limit)
  startingAssignments = god.total

  var secondCounter =  0 - 1;
 // console.log(secondCounter)
  for(let i = 0; i < god.total; i++){
    secondCounter++

    if(i == limit && capped == false){
      capped = true
    }

    if(capped){
      secondCounter=0
      start = start + 20;
      limit = limit + 20;
      capped = false;
      god = await askSgy('/sections/2535704616/assignments?start=' + start + '&limit=' + limit)
      //console.log(god)
    }
    if(i != limit){
      dueDates.push(truncate(god.assignment[secondCounter].due ,0, 10))
      dueTimes.push(truncate(god.assignment[secondCounter].due, 12, 19))
    
      let y = new Date(dueDates[i]);
      let month = y.getMonth();
      let day =  y.getDate();
      dueMonth.push(month + 1 )
      dueDay.push(day)

      switch(dueMonth[i]){
        case currentMonth:
        console.log("I shouldve activated " + today + tomorrow)
        console.log("Current Day: " + currentDay + "\nAssignment Due Date: " + dueDay[i])
          if((dueDay[i] == currentDay) && today == true){
            todayassignment = true
            channel.send("The assignment below is due Today!")
            let num = god.assignment[secondCounter]
            let Name = num.title
            let dueDate = num.due 
            let time = dueDate.split(" ")
            let milTime = time[1]
            milTime = milTime.split(":")

            let hours = Number(milTime[0])
            let minutes = Number(milTime[1])
            let seconds = Number(milTime[2])
            let timeValue;

            if (hours > 0 && hours <= 12) {
              timeValue= "" + hours;
            } else if (hours > 12) {
              timeValue= "" + (hours - 12);
            } else if (hours == 0) {
              timeValue= "12";
            }
    
            timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
            timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
            timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM


            let summary = num.description   
            let aType = num.type
            let points = num.max_points
            
              //channel.send(Name);
              let embed = new MessageEmbed()
              // Set the title of the field
              .setTitle(Name)
              // Set the color of the embed
              .setColor(0xff0000)
              // Set the main content of the embed
              .addFields(
                {name: "Due Date: " , value: time[0], inline: true},
                {name: "Due Time: " , value: timeValue, inline: true},
                {name: "Description: " , value: "(May be Empty) " + summary, inline: false},
                {name: "Total Points Worth:  " , value: points, inline: true},
                {name: "Type of: " , value: aType, inline: true}

                )
                .setTimestamp()
              //.setDescription(summary  + "\n   \n This is due: " + dueDate + " \n \n Type of: "  + aType + "\n \n This is worth: " + points +" points");
            // Send the embed to the specified channel
            channel.send(embed);
            
            }

            if((dueDay[i] == currentDay + 1) && tomorrow == true){
              tomorrowassignment = true
              
              channel.send("The assignment below is due tomorrow")

              let num = god.assignment[secondCounter]
              let Name = num.title
              let dueDate = num.due 
              let time = dueDate.split(" ")
              let milTime = time[1]
              milTime = milTime.split(":")

              let hours = Number(milTime[0])
              let minutes = Number(milTime[1])
              let seconds = Number(milTime[2])
              let timeValue;

              if (hours > 0 && hours <= 12) {
                timeValue= "" + hours;
              } else if (hours > 12) {
                timeValue= "" + (hours - 12);
              } else if (hours == 0) {
                timeValue= "12";
                }
      
              timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
              timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
              timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM


              let summary = num.description   
              let aType = num.type
              let points = num.max_points
              
                //channel.send(Name);
                let embed = new MessageEmbed()
                // Set the title of the field
                .setTitle(Name)
                // Set the color of the embed
                .setColor(0xff0000)
                // Set the main content of the embed
                .addFields(
                  {name: "Due Date: " , value: time[0], inline: true},
                  {name: "Due Time: " , value: timeValue, inline: true},
                  {name: "Description: " , value: "(May be Empty) " + summary, inline: false},
                  {name: "Total Points Worth:  " , value: points, inline: true},
                  {name: "Type of: " , value: aType, inline: true}
                  )
                  .setTimestamp()
                //.setDescription(summary  + "\n   \n This is due: " + dueDate + " \n \n Type of: "  + aType + "\n \n This is worth: " + points +" points");
              // Send the embed to the specified channel
                channel.send(embed);
            }
          

        break;
      }
      

    }

  }
  
  if(tomorrow && !tomorrowassignment){
    channel.send("No Assignments Due Tomorrow!")
    tomorrowassignment = false;
    tomorrow = false;
    todayassignment = false;
    today = false; 
  }else if(today && !todayassignment){
    channel.send("No Assignments Due Today!")
    todayassignment = false;
    today = false; 
    tomorrowassignment = false;
    tomorrow = false;
  }
  //  console.log(dueMonth)
   //console.log(dueDay)
    //console.log(currentMonth)
   // console.log(currentDay)
   // console.log(dueMonth)
   // console.log(dueDay)
   
 }
