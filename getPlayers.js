var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


//sleep function
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


//read in data to json file
for (i = 121; i <= 131; i++)
{
  let request = new XMLHttpRequest();
  url = 'https://www.balldontlie.io/api/v1/players?page=' + i;
  (function (i,request, url) {
    let fs = require('fs')
    request.open('GET', url);
    request.send();
    request.onload = ()=>{
      let players_per_page = JSON.parse(request.responseText).data;
      for (j=0;j<players_per_page.length;j++){
        let player = {
          name: players_per_page[j].first_name + " " + players_per_page[j].last_name,
          id: players_per_page[j].id,
        }
        let jsonString = JSON.stringify(player);
        jsonString = jsonString + "\n";
        fs.appendFile('./nbaRealPlayers.json', jsonString, err => {
          if (err) {
              console.log('Error writing file', err)
          } 
        })
      }
    }   
  })(i,request,url);
  sleep(2000);
  delete request;
}

