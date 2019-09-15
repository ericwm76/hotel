import $ from 'jquery';
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/bamboo-background.jpg'

// Do I need all these global variables, or can I just immediately instantiate a new Hotel class that will store it all?
let userData, roomData, bookingData, roomServiceData;

// Change to a Promise All? 
fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())

  .then(function (data) {
    userData = data.users;
    console.log('user data--->', userData)
  })

  .catch(function (err) {
    console.log('Unable to fetch the data', err);
  });

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())

  .then(function (data) {
    roomData = data.rooms;
    console.log('room data--->', roomData)

  })
  
  .catch(function (err) {
    console.log('Unable to fetch the data', err);
  });

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())

  .then(function (data) {
    bookingData = data.bookings;
    console.log('booking data--->', bookingData)
  })
  
  .catch(function (err) {
    console.log('Unable to fetch the data', err);
  });

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices')
  .then(response => response.json())

  .then(function (data) {
    roomServiceData = data.roomServices;
    console.log('roomService data--->', roomServiceData)

  })
  
  .catch(function (err) {
    console.log('Unable to fetch the data', err);
  });

  // Show the first tab by default
$('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-nav li:first').addClass('tab-active');

// Change tab class and display content
$('.tabs-nav a').on('click', function(event){
  event.preventDefault();
  $('.tabs-nav li').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});