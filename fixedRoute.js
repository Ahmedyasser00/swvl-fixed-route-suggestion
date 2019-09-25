
var voroni = require('d3-geo-voronoi');

const readline = require('readline');
const rl = readline.createInterface({input: process.stdin});
var all_stations_name = [];
var all_stations_locations = [];
var user_stations_count =0;
rl.on('line', function (line) {
 // if(line =="close") rl.close(); // u can fire event close by type close @ the end of lines in terminal
  if(isNaN(line)){     // check if the line refere To station or not 
    line = line.split(' ');
    all_stations_locations.push([line[1],line[2]]);
    all_stations_name.push(line[0]);
  }
  else user_stations_count = line; /// where last number will be the number of user stations (M)
})

rl.on('close',function(){
       fixedRoute();
       rl.close();
})

function fixedRoute (){

  var swvl_stations_length = all_stations_locations.length - user_stations_count;
  var swvl_stations = all_stations_locations.slice(0,swvl_stations_length);
  var swvl_stations_voroni = voroni.geoVoronoi(swvl_stations);

  for(var i=swvl_stations_length ; i<all_stations_locations.length ; i++) {
    nearset_swvl_station_index = swvl_stations_voroni.find(all_stations_locations[i][0],all_stations_locations[i][1]);
    console.log(all_stations_name[i]+' '+all_stations_name[nearset_swvl_station_index]);
  }
}
