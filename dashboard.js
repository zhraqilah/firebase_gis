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

  function initMap(year = "", month = "") {
    let label_time = [];
    let locations = [];
    let jumlahTitik = 0;
    dbRef.child("clicks").once('value').then((snapshot) => {
      let location_all = snapshot;
      let locations_new = [];
      $("#tabelMap").html("")

      location_all.forEach(element => {
        let one_location = element.val();
        let one_lat = one_location.lat
        let one_lng = one_location.lng
        let one_time = one_location.timestamp
        let one_label = one_location.label
        let one_waktu = one_location.datetime

        let date_split1 = one_waktu.split(" ")[0]
        let date_split2 = date_split1.split("/")[1]+"/"+date_split1.split("/")[0]+"/"+date_split1.split("/")[2]

        let dataYear = moment(date_split2).format('YYYY')
        let dataMonth = moment(date_split2).format('M')

        if(year != "" || month != ""){
          if(year != "" && month != ""){
            if(year == dataYear && month == dataMonth){

              let area = ""
              fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${one_lat},${one_lng}&key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k&language=id`).then(response => response.json()).then(data => {

                if(data.results[0].address_components[4] != undefined){
                  area = data.results[0].address_components[4].short_name
                }else{
                  area = "Tidak Diketahui"
                }

              })

              setTimeout(() => {
                jumlahTitik ++;
                let htmlStr = `<tr>
                <th scope="row">`+ jumlahTitik + `</th>
                <td>`+one_waktu+`</td>
                <td>`+one_lat+`</td>
                <td>`+one_lng+`</td>
                <td>`+area+`</td>
                <td><a href="detail.html?lat=${one_lat}&lng=${one_lng}" class="btn btn-info">Detail</a></td>
                </tr>`
                tabelMap.innerHTML += htmlStr;
              },1000)
              label_time.push({
                tstamp : one_time,
                label : one_label,
                waktu : one_waktu
              });
              locations_new.push({
                lat:one_lat,lng:one_lng
              });

              locations.push({
                lat:one_lat,lng:one_lng
              })
            }
          }else if(year != "" && month == ""){
            if(year == dataYear){

              let area = ""
              fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${one_lat},${one_lng}&key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k&language=id`).then(response => response.json()).then(data => {

                if(data.results[0].address_components[4] != undefined){
                  area = data.results[0].address_components[4].short_name
                }else{
                  area = "Tidak Diketahui"
                }

              })

              setTimeout(() => {
                jumlahTitik ++;
                let htmlStr = `<tr>
                <th scope="row">`+ jumlahTitik + `</th>
                <td>`+one_waktu+`</td>
                <td>`+one_lat+`</td>
                <td>`+one_lng+`</td>
                <td>`+area+`</td>
                <td><a href="detail.html?lat=${one_lat}&lng=${one_lng}" class="btn btn-info">Detail</a></td>
                </tr>`
                tabelMap.innerHTML += htmlStr;
              },1000)
              label_time.push({
                tstamp : one_time,
                label : one_label,
                waktu : one_waktu
              });
              locations_new.push({
                lat:one_lat,lng:one_lng
              });

              locations.push({
                lat:one_lat,lng:one_lng
              })
            }
          }else if(month != "" && year == ""){
            if(month == dataMonth){

              let area = ""
              fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${one_lat},${one_lng}&key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k&language=id`).then(response => response.json()).then(data => {

                if(data.results[0].address_components[4] != undefined){
                  area = data.results[0].address_components[4].short_name
                }else{
                  area = "Tidak Diketahui"
                }

              })

              setTimeout(() => {
                jumlahTitik ++;
                let htmlStr = `<tr>
                <th scope="row">`+ jumlahTitik + `</th>
                <td>`+one_waktu+`</td>
                <td>`+one_lat+`</td>
                <td>`+one_lng+`</td>
                <td>`+area+`</td>
                <td><a href="detail.html?lat=${one_lat}&lng=${one_lng}" class="btn btn-info">Detail</a></td>
                </tr>`
                tabelMap.innerHTML += htmlStr;
              },1000)
              label_time.push({
                tstamp : one_time,
                label : one_label,
                waktu : one_waktu
              });
              locations_new.push({
                lat:one_lat,lng:one_lng
              });

              locations.push({
                lat:one_lat,lng:one_lng
              })
            }
          }
          $("table").removeClass("d-none")
          $(".total-filter").removeClass("d-none")
        }else{
          label_time.push({
            tstamp : one_time,
            label : one_label,
            waktu : one_waktu
          });
          locations_new.push({
            lat:one_lat,lng:one_lng
          });

          locations.push({
            lat:one_lat,lng:one_lng
          })
          $("table").addClass("d-none")
          $(".total-filter").addClass("d-none")
        }

      });
      setTimeout(() => {
            $(".total-filter-h3").html(jumlahTitik)
      },1000)

      makeDashboard(locations)

      return locations_new;

    })
  }

  var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  function makeDashboard(dataLocation){

    let area = []

    dataLocation.forEach(element => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${element.lat},${element.lng}&key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k&language=id`).then(response => response.json()).then(data => {

        if(data.results[0].address_components[4] != undefined){
          area.push(data.results[0].address_components[4].short_name)
        }else{
          area.push("Tidak Diketahui")
        }

      })
    })

    setTimeout(() => {
      dataArea = groupBy(area, 'length')
      dataChart = []
      dataLabelChart = []
      $(".listCard").html("")
      $.map(dataArea, (val, i) => {
        dataChart.push(val.length)
        dataLabelChart.push(val[0])
        $(".listCard").append(`
          <div class="col-xl-3 col-md-6">
            <div class="card text-white mb-4" style="background:#f97710">
              <h5 class="card-body">${val.length}</h5>
              <div class="card-footer small">
                Total Kebakaran Wilayah ${val[0]}
              </div>
            </div>
          </div>
        `)
      })

      // document.querySelector("#titikTxt").innerHTML = area.length
      $("#canvasChart").html(`<canvas id="myChart" width="400" height="400"></canvas>`)
      const ctx = document.getElementById('myChart').getContext('2d');

      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dataLabelChart,
          datasets: [{
            label: 'Area',
            data: dataChart,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

    },1000)


  }


  $(document).on("click","#filterButton",function(){
    const year = $("#filterYear").val()
    const month = $("#filterMonth").val()
    initMap(year,month)
  })