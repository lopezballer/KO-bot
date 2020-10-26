/*============================================================================================================================*/
/*=========================================================GLOBALS============================================================*/
/*============================================================================================================================*/


const Discord = require('discord.js');
//incorrect token; request for proper token in order to get the bot to work
const token = 'NzY3ODQ5NDQ4MDY3ODI1Njc0.X435hg.mXOTKKPUSQeE6NOU8KhIuTOxOCM';
const bot = new Discord.Client();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



/*============================================================================================================================*/
/*========================================================FUNCTIONS===========================================================*/
/*============================================================================================================================*/



//sleep function
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

//loads in json file and converts to map
function loadFile(){
  var fs = require('fs');
  //will need to change to nbaRealPlayers.json when the script is done running
  var text = fs.readFileSync('./nbaRealPlayers.json','utf8')
  var line = text.split(/\n/);
  var wrapped = "[" + line.join(",") + "]";
  var obj = JSON.parse(wrapped);
  let map = new Map();
  for(i=0;i<obj.length;i++){
    map[obj[i].name] = obj[i].id;
  }
  return map;
}

//sends headshot image of player
function sendPlayerImage(player,message){
  let request = new XMLHttpRequest();
  url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAVzFi9P0sTv3stSLy0dNjggA5UrfdCPYY&cx=4c0e52a391a7738d8&q=' + player;
  request.open('GET', url);
  request.send();
  request.onload = ()=>{
      let metatags_array = JSON.parse(request.responseText).items[0].pagemap.metatags[0];
      message.channel.send(metatags_array['og:image']);
  } 
}

//gets season averages for a certain player and sends it to a channel
function getSznAverages(id, message){
  let request = new XMLHttpRequest();
  url = 'https://www.balldontlie.io/api/v1/season_averages?player_ids[]=' + id;
  request.open('GET', url);
  request.send();
  request.onload = ()=>{
    let jsonString = JSON.parse(request.responseText);
    jsonString = jsonString.data[0];
    let return_string = 'Games Played: ' + jsonString.games_played + '\n';
    return_string += 'Field Goals Made: ' + jsonString.fgm + '\n';
    return_string += 'Field Goals Atempted: ' + jsonString.fga + '\n';
    return_string += 'Three Point Field Goals Made: ' + jsonString.fg3m + '\n';
    return_string += 'Three Point Field Goals Atempted: ' + jsonString.fg3a + '\n';
    return_string += 'Free Throws Made: ' + jsonString.ftm + '\n';
    return_string += 'Free Throws Atempted: ' + jsonString.fta + '\n';
    return_string += 'Rebounds: ' + jsonString.reb + '\n';
    return_string += 'Assists: ' + jsonString.ast + '\n';
    return_string += 'Steals: ' + jsonString.stl + '\n';
    return_string += 'Blocks: ' + jsonString.blk + '\n';
    return_string += 'Average Points: ' + jsonString.pts + '\n';
    return_string += 'Field Goal Percentage: ' + jsonString.fg_pct + '\n';
    return_string += 'Three Point Field Goal Percentage: ' + jsonString.fg3_pct + '\n';
    return_string += 'Free Throw Percentage: ' + jsonString.ft_pct;
    message.channel.send(return_string);
  }
}



/*================================================================================================================================*/
/*====================================================DISCORD BOT FUNCTIONS=======================================================*/
/*================================================================================================================================*/



bot.on('ready', ()=>{
  bot.user.setActivity('apples to oranges');
})


/*this will change, but it is a rought version of what we want.
there is no parser and no error input checker and it is case sensitive
which we will want to change in the future as we develop*/
bot.on('message',message=>{
  if (message.author != bot.user){
    const playerIdMap = loadFile();
    let substr = message.content.substring(0,4);
    let player = message.content.substring(5,message.content.length);
    playerId = playerIdMap[player];

    message.channel.send('hello everyone', {tts:true});
    //sendPlayerImage(player, message);
    //getSznAverages(playerId, message);
  }
});


bot.login(token)
