
// let locations = [];
var config = {
  apiKey: "AIzaSyDV6AS1oeDU9z0uO_qM9M5TO-wFr64OBrw",
    authDomain: "belajar-4e4f8.firebaseapp.com",
    databaseURL: "https://belajar-4e4f8.firebaseio.com",
    projectId: "belajar-4e4f8",
    storageBucket: "belajar-4e4f8.appspot.com",
    messagingSenderId: "315893487502",
    appId: "1:315893487502:web:21a783cc37f1cedef376df"
};

firebase.initializeApp(config);
const db=firebase.database();
var dbRef=db.ref();

let jumlahTitik = 0;
let tabelMap = document.getElementById('tabelMap');

function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng },  (results, status) =>{
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            var address = (results[0].formatted_address);
        }
    });
}

function initMap() {
  let label_time = [];
  dbRef.child("clicks").once('value').then((snapshot) => {
    let location_all = snapshot;
    let locations_new = [];
   
    location_all.forEach(element => {
      let one_location = element.val();
      let one_lat = one_location.lat
      let one_lng = one_location.lng
      let one_time = one_location.timestamp
      let one_label = one_location.label
      let one_waktu = one_location.datetime
      label_time.push({
        tstamp : one_time,
        label : one_label,
        waktu : one_waktu
      });
      locations_new.push({
        lat:one_lat,lng:one_lng
      });
      jumlahTitik ++;
       let htmlStr = `<tr>
      <th scope="row">`+ jumlahTitik + `</th>
      <td>`+one_waktu+`</td>
      <td>`+one_label+`</td>
      <td>`+one_lat+`</td>
      <td>`+one_lng+`</td>
      <td>`+one_time+`</td>
    </tr>`
    tabelMap.innerHTML += htmlStr;
        // getReverseGeocodingData(one_lat,one_lng);
    });

    return locations_new;
   
  }).then((loc_new) => {
    let titikElm = document.getElementById('titikTxt');
    titikElm.innerHTML = "<h3>"+String(label_time.length)+" <small>Titik</small></h3>";
    console.log("TITIK : " + String(label_time.length));
   
    const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: -5.143605142193621, lng: 119.40739631652832 },
  });
    const iconBase =
    "http://maps.google.com/mapfiles/kml/shapes/firedept.png";
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
  // Create an array of alphabetical characters used to label the markers.
  // const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  const markers = loc_new.map((position, i) => {
    const info_text = label_time[i % label_time.length].label;
    const info_waktu = label_time[i % label_time.length].waktu;
    const label = String(i+1);

    // const waktu = String(label_time[i % label_time.length]);

    const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h3 id="firstHeading" class="firstHeading">'+info_text+'</h3>' +
    '<div id="bodyContent">' +
    "<h6>Diinput : "+info_waktu+"</h6>" +
    // '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    // "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    // "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";

 
    const marker = new google.maps.Marker({
      position,
      label,
      icon : iconBase,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(contentString);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  // new MarkerClusterer({ markers, map });
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });


  });


  
}
