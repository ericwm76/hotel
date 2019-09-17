import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel.js';
import DOMupdates from './DOMupdates.js'
import './images/bamboo-background.jpg'

let hotel;

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(data => data.json()), 
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(data => data.json()), 
  fetch ('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')  
    .then(data => data.json()), 
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices')
    .then(data => data.json())])
    .then(data => hotel = new Hotel(data[0], data[1], data[2], data[3]))
    .then(() => populateDOM());

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

function populateDOM() {
  let date = '2019/09/18';
  let numberAvailable = hotel.getRoomsAvailable(date);
  let occupancy = hotel.getOccupancy(date);
  let totalRevenue = hotel.getTotalRevenue(date);
  let mostPopularDates = hotel.findMostPopularDates();
  let leastPopularDates = hotel.findLeastPopularDates();


  DOMupdates.displayDate(date);
  DOMupdates.displayRoomsAvail(numberAvailable);
  DOMupdates.displayOccupancy(occupancy);
  DOMupdates.displayTotalRevenue(totalRevenue);
  DOMupdates.displayMostPopularDates(mostPopularDates);
  DOMupdates.displayLeastPopularDates(leastPopularDates);

}