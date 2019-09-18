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

$('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-nav li:first').addClass('tab-active');

$('.tabs-nav a').on('click', function(event) {
  event.preventDefault();
  $('.tabs-nav li').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});

$('#new-guest').on('click', function() {
  $('#new-guest-form').show()
});
$('#submit-new-guest').on('click', createGuest);
$('#select-guest-btn').on('click', chooseGuest);
$('#new-booking-btn').on('click', DOMupdates.displayRoomTypesList);
$('#select-room-type').on('click', displayRoomsModal);
$('#close-modal').on('click', DOMupdates.hideRoomsModal);
$('#confirm-booking-btn').on('click', confirmBooking);
$('#select-booking-date').on('click', showBookingsByDate)
$('#select-orders-date').on('click', showOrdersByDate)

function showBookingsByDate() {
  $('#bookings-by-date').html('');
  DOMupdates.displayBookingsByDate($('#booking-dates').val(), hotel.bookings)
} 

function showOrdersByDate() {
  $('#orders-by-date').text('');
  DOMupdates.displayFoodOrdersByDate($('#food-order-dates').val(), hotel.foodOrders)
} 

function confirmBooking() {
  if ($("input[type=radio]:checked").length > 0) {
    hotel.currentGuest.createNewBooking(today, $("input[type=radio]:checked").val());
    $('.modal-content').html('<h4>Booking confirmed!</h4>');
    setTimeout(DOMupdates.hideRoomsModal, 1500);
  }
}

function displayRoomsModal() {
  DOMupdates.displayAllAvailableRooms(hotel.getAvailableRoomNumbers(today), hotel.rooms, $('#room-types-avail').val());
  $('.modal').show();
  $('.modal-content').show();
  $('#room-types').text($('#room-types-avail').val());
}

function populateDOM() {
  let numberAvailable = hotel.getAvailableRoomNumbers(today).length;
  let occupancy = hotel.getOccupancy(today);
  let totalRevenue = hotel.getTotalRevenue(today);
  let mostPopularDates = hotel.findMostPopularDates();
  let leastPopularDates = hotel.findLeastPopularDates();

  DOMupdates.displayCurrentGuest(hotel.currentGuest.name);
  DOMupdates.displayDate(today);
  DOMupdates.displayNumRoomsAvail(numberAvailable);
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

function createGuest(e) {
  e.preventDefault();
  let guest = $('#new-guest-name').val();
  hotel.createNewGuest(guest);
  hotel.findCurrentGuestInfo(guest);
  populateGuestList();
  DOMupdates.clearCustomerTab();
  DOMupdates.displayCurrentGuest(guest);
  DOMupdates.displayGuestSections();
  DOMupdates.displayGuestBookingHistory(hotel.currentGuest.customerBookings);
  DOMupdates.displayGuestFoodHistory(hotel.currentGuest.customerFoodOrders);
}

function chooseGuest(e) {
  e.preventDefault();
  let guest = $('#guest-list').val();
  hotel.findCurrentGuestInfo(guest);
  DOMupdates.clearCustomerTab();
  DOMupdates.displayCurrentGuest(guest);
  DOMupdates.displayGuestSections();
  DOMupdates.displayGuestBookingHistory(hotel.currentGuest.customerBookings, hotel.rooms);
  DOMupdates.displayGuestFoodHistory(hotel.currentGuest.customerFoodOrders);
}