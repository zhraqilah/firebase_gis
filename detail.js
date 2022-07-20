var get_data = window.location.search.substr(1).split("&")
var get_data_lat = get_data[0].split("lat=")[1]
var get_data_lng = get_data[1].split("lng=")[1]

// var locations = [];
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

  let number_filtered = 0
  let number_filtered_subtract = 0
  let month_now = moment(new Date()).format('MM/YYYY')
  let month_now_subtract = moment(new Date()).subtract(1, 'months').format('MM/YYYY')
  let month_now_label = moment(new Date()).format('MMMM - YYYY')
  let month_now_subtract_label = moment(new Date()).subtract(1, 'months').format('MMMM - YYYY')

      location_all.forEach(element => {
        let one_location = element.val();
        let one_lat = one_location.lat
        let one_lng = one_location.lng
        let one_time = one_location.timestamp
        let one_label = one_location.label
        let one_waktu = one_location.datetime

        let date_split1 = one_waktu.split(" ")[0]
        let date_split2 = date_split1.split("/")[1]+"/"+date_split1.split("/")[0]+"/"+date_split1.split("/")[2]

        let month_list = moment(date_split2).format('MM/YYYY')

        if(month_list == month_now){
          number_filtered += 1
        }

        if(month_list == month_now_subtract){
          number_filtered_subtract += 1
        }

        let area = ""
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${one_lat},${one_lng}&key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k&language=id`).then(response => response.json()).then(data => {

          if(data.results[0].address_components[4] != undefined){
            area = data.results[0].address_components[4].short_name
          }else{
            area = "Tidak Diketahui"
          }

        })

        setTimeout(() => {

        if(one_lat == get_data_lat && one_lng == get_data_lng){
          label_time.push({
            tstamp : one_time,
            label : one_label,
            waktu : one_waktu,
            lat : one_lat,
            lng : one_lng,
            area : area
          });
          locations_new.push({
            lat:one_lat,lng:one_lng
          });
        }
          jumlahTitik ++;
          let htmlStr = `<tr>
          <th scope="row">`+ jumlahTitik + `</th>
          <td>`+one_waktu+`</td>
          <td>`+one_lat+`</td>
          <td>`+one_lng+`</td>
          <td>`+area+`</td>
          </tr>`
        },1000)
        // getReverseGeocodingData(one_lat,one_lng);
      });

      let titikTxtBulan1 = document.getElementById('titikTxtBulan1');
      let labelBulan1 = document.getElementById('labelBulan1');
      let titikTxtBulan2 = document.getElementById('titikTxtBulan2');
      let labelBulan2 = document.getElementById('labelBulan2');


      return locations_new;

    }).then((loc_new) => {
        setTimeout(() => {
      let titikElm = document.getElementById('titikTxt');

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
    const info_area = label_time[i % label_time.length].area;
    const info_suhu = label_time[i % label_time.length].suhu ? label_time[i % label_time.length].suhu : 0;
    const info_terdeteksi = label_time[i % label_time.length].terdeteksi ? label_time[i % label_time.length].terdeteksi : "Ya";
    const label = String(i+1);
    // console.log(info_waktu > )
    // const waktu = String(label_time[i % label_time.length]);

    // '<h3 id="firstHeading" class="firstHeading">'+info_text+'</h3>' +
    const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<div id="bodyContent">' +
    "<h6>Waktu Kebakaran : "+info_waktu+"</h6>" +
    "<h6>Wilayah Kebakaran : "+info_area+"</h6>" +
    "<h6>Suhu/Kelembapan : "+info_suhu+"</h6>" +
    "<h6>Terdeteksi API : "+info_terdeteksi+"</h6>" +
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

        },1000)

});



  }