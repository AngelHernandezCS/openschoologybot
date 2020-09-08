/*
This is Version 1 of schoology assignment bot. Im just a beginner in coding and i barely know what im doing. Anyways i do not know how discord bots work when they are in multiple servers so this only works on an individual basis

Thanks to Sheepmaster for being the one to figure out the schoolgy api 
*/



//schoology stuff
const askSgy = require('./get-things-from-schoology.js')
const fs = require('fs').promises
var assignments = require('./assignments.json')
var god, startingAssignments;
var assignmentstotal;
const min = 0x00AE
const max = 0x0377
var test;

//discord bot stuff
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const client = new Discord.Client();

var channel;

client.on('ready', () => {
  console.log('Im ready');
  //channel = client.channels.cache.get('722984937468198981');
  //channel.send("I havent Broken down Yet");
  //console.log(channel)
});

client.on('message', msg => {
  if (msg.content === '**Initialize') {
    channel = msg.channel
    channel.send('Im Not Broken Yet!  This channel will be used to announce updates on when new Assignments are posted');
    Main();

  }
});

client.login(process.env.TOKEN);


function r (count = 3) {
  let str = ''
  for (let i = 0; i < count; i++) {
    str += String.fromCharCode((Math.random() * (max - min + 1) + min) | 0)
  }
  return str
}

// 55610840


 
function Main(){
//Creates Json file with assignments info of specific class and stores total assignments in a variable 
async function getStarterassignments(){
 let god = await askSgy('/sections/2535704616/assignments')
startingAssignments = god.total
}

//calls the function and then loops the update function
getStarterassignments()
.then(() => {
  var constloop = setInterval(updateassignments, 600000)


})

//function that asks schoology for class assignment info and then writes that info into a json file and formatting it.
 async function updateassignments(){
    await askSgy('/sections/2535704616/assignments')
  .then(json =>  fs.writeFile('./assignments.json', JSON.stringify(json,null,4)))
 // console.log("This is the starting amount of assignments: " + startingAssignments)
 // console.log("This is the current amount of assignments: " + assignments.total)

  //if there is a change in assignments run for loop
if(startingAssignments < assignments.total){
    channel.send("@everyone" + " New Assignment(s) Posted")


   // loops an embed for the new assignments posted
for (let newAssignments = assignments.total - startingAssignments;  newAssignments > 0; newAssignments--){ 

      let Name = assignments.assignment[assignments.total - newAssignments ].title
      let dueDate = assignments.assignment[assignments.total - newAssignments ].due 
      let summary = assignments.assignment[assignments.total - newAssignments ].description   
      let aType = assignments.assignment[assignments.total - newAssignments ].type
        //channel.send(Name);
        var embed = new MessageEmbed()
        // Set the title of the field
        .setTitle(Name)
        // Set the color of the embed
        .setColor(0xff0000)
        // Set the main content of the embed
        .setDescription(summary  + "\n   \n This is due: " + dueDate + " \n \n Type of: "  + aType);
      // Send the embed to the specified channel
      channel.send(embed);

}
startingAssignments = assignments.total

}else{
  //do nothing
  //possibly add logic for when an assignment is deleted???


}

}

}
