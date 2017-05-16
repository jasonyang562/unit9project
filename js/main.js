//connect to firebase reservation list database
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDrZ1t9f4dwyTGhGD4uHO8LVCmrs-dt_F4",
    authDomain: "reservation-site-eb9de.firebaseapp.com",
    databaseURL: "https://reservation-site-eb9de.firebaseio.com",
    projectId: "reservation-site-eb9de",
    storageBucket: "reservation-site-eb9de.appspot.com",
    messagingSenderId: "101305670607"
  };
  firebase.initializeApp(config);

//Reservation update and read code start

// Connect to Database
var database = firebase.database();

$("#reservationForm").on("submit", function(ev){
	ev.preventDefault();
	
	//input details
	var customerName = $(".cName").val(),
	dayReserved = $(".reserveDay").val();


	if(customerName === ""){
		alert("Please enter your name for a reservation.");
	} else if(dayReserved === ""){
		alert("Please enter a day for the reservation.");
	}else{

		database.ref('reservations').push({
			name: customerName,
			day: dayReserved
		});	
		getReservationsUpdate();
	
	}
});


//repeated code for page load and update database events
function readData(para){
	    // Code to execute when a value change occurs
    var allReservations = para.val();
     
     // get each of the reservation details     
    for (var reservation in allReservations) {

		// Create an object literal with the data we'll pass to Handlebars
		var context = {
			name: allReservations[reservation].name,
			day: allReservations[reservation].day
		};
  
		console.log(context.name + " yo!");

        //add the reservation details to the template        
        var source = $("#reservation-template").html();
        var template = Handlebars.compile(source);
        var reservationListItem = template(context);
        $('.reservations').append(reservationListItem);
 	}
}

// let  user read the reservations when loading the page eg .once().then
function getReservationsOnLoad(){
  database.ref('reservations').once('value').then(function (results) {
  	readData(results);
  });
}

//update reservations list when user udpates database
function getReservationsUpdate(){
  database.ref('reservations').on('value', function (results) {
  	$('.reservations').empty();
  	  //remove any reservations that are currently being displayed in the reservations list  	
  	readData(results);
  });
}

getReservationsOnLoad ();


//Google Maps code start
function initMap(){

  	// create the map
      var map = new google.maps.Map(document.getElementById('map'),      {
      	zoom: 10,
      	center: {
        	lat: 40.8054491,
          	lng: -73.9654415
        },
      scrollwheel: false
      });
      
      //set the market to my location
      var marker = new google.maps.Marker({
      	position: {
        	lat: 40.8054491,
          	lng: -73.9654415
        },
        map: map,
        title: 'User Location'
      });
      

}

initMap();

//Google Maps code end
