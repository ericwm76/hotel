import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel.js';
import DOMupdates from './DOMupdates.js'
import './images/bamboo-background.jpg'

let hotel;
let today = `${new Date().getFullYear()}/${String(new Date()
    .getMonth() + 1)
    .padStart(2, '0')}/${String(new Date()
    .getDate())
    .padStart(2, '0')}`;

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
    .then(() => populateDOM())
    .then(() => populateDates())
    .then(() => populateGuestList());

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
  let numberAvailable = hotel.getRoomsAvailable(today);
  let occupancy = hotel.getOccupancy(today);
  let totalRevenue = hotel.getTotalRevenue(today);
  let mostPopularDates = hotel.findMostPopularDates();
  let leastPopularDates = hotel.findLeastPopularDates();

  DOMupdates.displayCurrentGuest(hotel.currentGuest.name);
  DOMupdates.displayDate(today);
  DOMupdates.displayRoomsAvail(numberAvailable);
  DOMupdates.displayOccupancy(occupancy);
  DOMupdates.displayTotalRevenue(totalRevenue);
  DOMupdates.displayMostPopularDates(mostPopularDates);
  DOMupdates.displayLeastPopularDates(leastPopularDates);
}

function populateGuestList() {
  hotel.guests
    .sort((guestA, guestB) => (guestA.name > guestB.name ? 1 : -1))
    .forEach(guest => {
      DOMupdates.populateGuests(guest.name, guest.id);
    });
}

function populateDates() {
  let dates = hotel.findDatesArray();
  dates
  .sort((dateA, dateB) => (dateA > dateB ? 1 : -1))
  .forEach(date => DOMupdates.populateDatesList(date));
}

$('#new-guest').on('click', function() {$('#new-guest-form').show()
});

$('#select-guest-btn').on('click', chooseGuest);

function chooseGuest() {
  let guest = $('#guest-list').val();
  hotel.findCurrentGuestInfo(guest);
  DOMupdates.displayCurrentGuest(guest);
}


function searchCustomer() {
  hotel.guests.filter(guest => guest.name.includes($('#search-customer').val()));
}
