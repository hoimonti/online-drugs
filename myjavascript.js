function fn_marker(val) 
{ 
var scaleval = 12; 
var color = 'red'; 
var fillcolor = 'blue'; 
var strokeweight = 2; 
if (val.defaultValue == 'circle') 
marker.setIcon({path: google.maps.SymbolPath.CIRCLE, scale: scaleval, strokeColor: color, 
strokeOpacity: 1, 
strokeWeight: strokeweight, 
fillColor: fillcolor, 
fillOpacity: .6, }); 
if (val.defaultValue == 'arrow') 
marker.setIcon({path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale: scaleval, strokeColor: color, 
strokeOpacity: 1, 
strokeWeight: strokeweight, 
fillColor: fillcolor, 
fillOpacity: .6, }); 
if (val.defaultValue == 'custom') 
marker.setIcon({ 
url: "images/greenicon.ico", 
size: new google.maps.Size(71, 71), 
origin: new google.maps.Point(0, 0), 
anchor: new google.maps.Point(17, 17), 
scaledSize: new google.maps.Size(50, 50)}); 
if (val.defaultValue == 'mark') 
marker.setIcon({path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z', scale: scaleval / 8, strokeColor: color, 
strokeOpacity: 1, 
strokeWeight: strokeweight, 
fillColor: fillcolor, 
fillOpacity: .6, }); 
animation(); 
} 
function animation() 
{ 
var ani = google.maps.Animation.DROP; 
marker.setAnimation(ani); 
setTimeout(function () { 
marker.setAnimation(null); 
}, 4000); 
} 
function fn_zoom(para) 
{ 
if (para.defaultValue == 'world') 
map.setZoom(1); 
if (para.defaultValue == 'continent') 
map.setZoom(5); 
if (para.defaultValue == 'city') 
map.setZoom(10); 
if (para.defaultValue == 'streets') 
map.setZoom(15); 
if (para.defaultValue == 'building') 
map.setZoom(20); 
} 
function calculatedistance(s1, s2, e1, e2) 
{ 
var latlngA = new google.maps.LatLng(s1, s2); 
var latlngB = new google.maps.LatLng(e1, e2); 
var dist = google.maps.geometry.spherical.computeDistanceBetween(latlngA, latlngB); 
return (dist / 1000).toFixed(2); 
} 
function add_list(list, value1) { 
var ul = document.getElementById(list); 
var li = document.createElement("li"); 
li.appendChild(document.createTextNode(value1)); 
ul.appendChild(li); 
} 
function fn_clearmarker(pmarker) 
{ 
for (i = 0; i < pmarker.length; i++) 
pmarker[i].setMap(null); 
} 
function fn_weather(para, place1, lat, lng) 
{ 
// place1=place1.defaultValue.trim(); 
var xhttp = new XMLHttpRequest(); 
var city_name; 
var coord_lon, coord_lat; 
var country; 
var sun_rise, sun_set; 
var temprature_value, temprature_min, temprature_max, temprature_unit; 
var humidity_value, humidity_unit; 
var pressure_value, pressure_unit; 
var speed_value, speed_name; 
var clouds_value, clouds_name; 
var visibility_value; 
var weather_number, weather_value; 
var lastupdate_value; 
xhttp.onreadystatechange = function (stat) 
{ 
if (xhttp.readyState == 4 && xhttp.status == 200) 
{ 
myFunction(xhttp); 
} 
}; 
//alert(window.location.search.split("=")[1]); 
//var place=sessionStorage.getItem("autosave"); 
//var place=sessionStorage.getItem(place); 
place = place1; 
if (window.location.search.split("=")[1] == "lat" || para == 'lat' || para == 'msg') 
xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=2ed1d6de0691e10b11086405e2a68bbb&mode=xml", true); 
else 
xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=2ed1d6de0691e10b11086405e2a68bbb&mode=xml", true); 
xhttp.send(); 
function fn_c(stat, flag) 
{ 
stat1 = (parseFloat(stat) - 273.15).toFixed(2); 
if (flag == 'c') 
stat1 = "(" + stat1 + " )C "; 
else 
stat1 = stat + " (" + stat1 + " )C "; 
return stat1; 
} 
function myFunction(xml) 
{ 
var xmlDoc = xml.responseXML; 
// document.getElementById("demo").innerHTML = 
city_name = xmlDoc.getElementsByTagName("city")[0].getAttribute("name"); 
coord_lon = xmlDoc.getElementsByTagName("coord")[0].getAttribute("lon"); 
coord_lat = xmlDoc.getElementsByTagName("coord")[0].getAttribute("lat"); 
sun_rise = xmlDoc.getElementsByTagName("sun")[0].getAttribute("rise"); 
sun_set = xmlDoc.getElementsByTagName("sun")[0].getAttribute("set"); 
temperature_value = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value"); 
temperature_min = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("min"); 
temperature_max = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("max"); 
temperature_unit = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("unit"); 
humidity_value = xmlDoc.getElementsByTagName("humidity")[0].getAttribute("value"); 
humidity_unit = xmlDoc.getElementsByTagName("humidity")[0].getAttribute("unit"); 
pressure_value = xmlDoc.getElementsByTagName("pressure")[0].getAttribute("value"); 
pressure_unit = xmlDoc.getElementsByTagName("pressure")[0].getAttribute("unit"); 
speed_name = xmlDoc.getElementsByTagName("speed")[0].getAttribute("name"); 
speed_unit = xmlDoc.getElementsByTagName("speed")[0].getAttribute("unit"); 
direction_value = xmlDoc.getElementsByTagName("direction")[0].getAttribute("value"); 
direction_code = xmlDoc.getElementsByTagName("direction")[0].getAttribute("code"); 
direction_name = xmlDoc.getElementsByTagName("direction")[0].getAttribute("name"); 
clouds_value = xmlDoc.getElementsByTagName("clouds")[0].getAttribute("value"); 
clouds_name = xmlDoc.getElementsByTagName("clouds")[0].getAttribute("name"); 
visibility_value = xmlDoc.getElementsByTagName("visibility")[0].getAttribute("value"); 
weather_number = xmlDoc.getElementsByTagName("weather")[0].getAttribute("value"); 
weather_value = xmlDoc.getElementsByTagName("weather")[0].getAttribute("unit"); 
lastupdate_value = xmlDoc.getElementsByTagName("lastupdate")[0].getAttribute("value"); 
//kelvin to centigrate 
if (window.location.search.split("=")[1] == "lat" || para == 'lat' || para == 'msg' || para == 'list') 
{ 
if (para == 'list') 
{ 
document.getElementById("list").innerHTML += 
"<tr onclick=fn_chk(this)><td id='slno'></td><td id='city'>" + city_name + "</td><td id='temp'>" + fn_c(temperature_value, 'c') + "</td><td id='clouds_name'>" + clouds_name + "</td><td id='weather_number'>" + weather_number + "</td><td id='speed_name'>" + speed_name + "</td><td id='lat'>" + coord_lat + "</td><td id='lng'>" + coord_lon + "</td></tr>" 
} else if (para == 'msg') 
{ 
document.getElementById("weather").innerHTML = "<table id='tabledata'>" + 
"<tr><td id='temp'>" + fn_c(temperature_value, 'c') + "</td><td id='clouds_name'>" + clouds_name + "</td><td id='weather_number'>" + weather_number + "</td><td id='speed_name'>" + speed_name + "</td></tr>" + 
"</table>"; 
// return fn_c(temperature_value); 
} else 
{ 
document.getElementById("weather").innerHTML = "<table>" + 
"<th colspan=7>Weather Report Dated:" + Date() + "</th>" + 
"<tr><td>City</td><td>" + city_name + "</td></tr>" + 
"<tr><td>Temperature</td><td>Value</td><td>" + fn_c(temperature_value, 'c') + "<td>Units</td><td>" + temperature_unit + "</td></tr>" + 
"<tr><td>Clouds</td><td>Value</td><td>" + clouds_value + "<td>Name</td><td>" + clouds_name + "</td></tr>" + 
"<tr><td>Weather</td><td>Number</td><td>" + weather_number + "<td>Value</td><td>" + weather_value + "</td></tr>" + 
"<tr><td>Lastupdate</td><td>Value</td><td>" + lastupdate_value + "</td></tr>" + 
"</table>" 
} 
} else 
{ 
document.getElementById("weather").innerHTML = "<table id='t01'>" + 
"<th colspan=7>Weather Report Dated:" + Date() + "</th>" + 
"<tr><td>City</td><td>" + city_name + "</td></tr>" + 
"<tr><td>Cordinate</td><td>Longitude</td><td width='300px'>" + coord_lon + "<td>Latitude</td><td width='300px'>" + coord_lat + "</td></tr>" + 
"<tr><td>Sun</td><td>Rise</td><td>" + sun_rise + "<td>Set</td><td>" + sun_set + "</td></tr>" + 
"<tr><td>Temperature</td><td>Value</td><td>" + fn_c(temperature_value) + "<td>Units</td><td>" + temperature_unit + "</td></tr>" + 
"<tr><td>Temperature</td><td>Min</td><td>" + fn_c(temperature_min) + "<td>Max</td><td>" + fn_c(temperature_max) + "</td></tr>" + 
"<tr><td>Humidity</td><td>Value</td><td>" + humidity_value + "<td>Units</td><td>" + humidity_unit + "</td></tr>" + 
"<tr><td>Pressure</td><td>Value</td><td>" + pressure_value + "<td>Units</td><td>" + pressure_unit + "</td></tr>" + 
"<tr><td>Speed</td><td>Value</td><td>" + speed_value + "<td>Name</td><td>" + speed_name + "</td></tr>" + 
"<tr><td>Direction</td><td>Value</td><td>" + direction_value + "<td>Code</td><td>" + direction_code + "</td><td>Code</td><td>" + direction_name + "</td></tr>" + 
"<tr><td>Clouds</td><td>Value</td><td>" + clouds_value + "<td>Name</td><td>" + clouds_name + "</td></tr>" + 
"<tr><td>Visibility</td><td>Value</td><td>" + visibility_value + "</td></tr>" + 
"<tr><td>Weather</td><td>Number</td><td>" + weather_number + "<td>Value</td><td>" + weather_value + "</td></tr>" + 
"<tr><td>Lastupdate</td><td>Value</td><td>" + lastupdate_value + "</td></tr>" + 
"</table>" 
; 
} 
} 
} 
function fn_marker_pic(imgtitle, caption) 
{ 
marker = new MarkerWithLabel({ 
map: map, 
position: {lat: parseFloat(lat), lng: parseFloat(lng)}, 
labelContent: fn_weatherpic(imgtitle, caption), 
labelStyle: {opacity: 1}, 
labelAnchor: new google.maps.Point(60, 50), 
}); 
} 
function fn_weatherpic(title, pcaption) 
{ 
var pic = document.createElement('img'); 
var fig = document.createElement('figure'); 
var figcaption = document.createElement('figcaption'); 
{ 
if (title.indexOf('clear sky') >= 0) 
pic.src = "./images/sun.png"; 
if (title.indexOf('clouds') >= 0) 
pic.src = "./images/cloud.png"; 
if (title.indexOf('rain') >= 0) 
pic.src = "./images/rain.png"; 
pic.width = 50; 
pic.height = 50; 
fig.id = 'caption'; 
figcaption.innerHTML = pcaption; 
} 
fig.appendChild(pic); 
fig.appendChild(figcaption); 
return fig; 
} 
function fn_type(sel_para) 
{ 
var opt=[ 
"All", 
"accounting", 
"airport", 
"amusement_park", 
"aquarium", 
"art_gallery", 
"atm", 
"bakery", 
"bank", 
"bar", 
"beauty_salon", 
"bicycle_store", 
"book_store", 
"bowling_alley", 
"bus_station", 
"cafe", 
"campground", 
"car_dealer", 
"car_rental", 
"car_repair", 
"car_wash", 
"casino", 
"cemetery", 
"church", 
"city_hall", 
"clothing_store", 
"convenience_store", 
"courthouse", 
"dentist", 
"department_store", 
"doctor", 
"electrician", 
"electronics_store", 
"embassy", 
"establishment", 
"finance", 
"fire_station", 
"florist", 
"food", 
"funeral_home", 
"furniture_store", 
"gas_station", 
"general_contractor", 
"grocery_or_supermarket", 
"gym", 
"hair_care", 
"hardware_store", 
"health", 
"hindu_temple", 
"home_goods_store", 
"hospital", 
"insurance_agency", 
"jewelry_store", 
"laundry", 
"lawyer", 
"library", 
"liquor_store", 
"local_government_office", 
"locksmith", 
"lodging", 
"meal_delivery", 
"meal_takeaway", 
"mosque", 
"movie_rental", 
"movie_theater", 
"moving_company", 
"museum", 
"night_club", 
"painter", 
"park", 
"parking", 
"pet_store", 
"pharmacy", 
"physiotherapist", 
"place_of_worship", 
"plumber", 
"police", 
"post_office", 
"real_estate_agency", 
"restaurant", 
"roofing_contractor", 
"rv_park", 
"school", 
"shoe_store", 
"shopping_mall", 
"spa", 
"stadium", 
"storage", 
"store", 
"subway_station", 
"synagogue", 
"taxi_stand", 
"train_station", 
"travel_agency", 
"university", 
"veterinary_care", 
"zoo"]; 
var sel=document.getElementById(sel_para); 
for (i=0;i<opt.length;i++) 
{ 
sel.options.add( new Option(opt[i],opt[i]) ); 
} 
}
