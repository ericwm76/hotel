import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel.js';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/bamboo-background.jpg'

let hotel;

let roomServiceData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices')
  .then(data => data.json());

let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(data => data.json());

let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json());

let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json());
  
Promise.all([roomServiceData, userData, roomData, bookingData])
  .then(hotel = new Hotel(userData, roomData, bookingData, roomServiceData))
  .catch(function (err) {
    console.log('Unable to fetch the data', err)
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