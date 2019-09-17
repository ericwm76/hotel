import $ from 'jquery';

const DOMupdates = {
  displayCurrentGuest(name) {
    $('#current-guest').text(name)
  },

  displayDate(date) {
    $('#todays-date').text(date);
  },

  displayRoomsAvail(number) {
    $('#rooms-avail').text(number)
  },

  displayOccupancy(number) {
    $('#occupancy').text(`${number}%`)
  },

  displayTotalRevenue(number) {
    $('#total-revenue').text(`$${number}`)
  },

  displayMostPopularDates(array) {
    array.forEach(date => {
      $('#most-popular').append(`<li>${date}</li>`)
    })
  },

  displayLeastPopularDates(array) {
    array.forEach(date => {
      $('#least-popular').append(`<li>${date}</li>`)
    })
  },

  populateGuests(name, id) {
    $('#guest-list').append(`<option value='${name}'> ${name} </option>`);
  },

  populateDatesList(date) {
    $('#dates').append(`<option value="${date}"> ${date} </option>`)
  },

  displayGuestBookingHistory(bookings, rooms) {
    bookings.forEach(booking => {
      let price = rooms.find(room => room.number === booking.roomNumber).costPerNight;
      $('#booking-history').append(`<li>Date: ${booking.date}, Room Number: ${booking.roomNumber}, Cost: ${price}`)
    })  
    if ($('#booking-history').text() === '') {
      $('#booking-history').text('This customer hasn\'t made any bookings before!')
    } 
  },

  displayGuestFoodHistory(orders) {
    orders.forEach(order => {
      $('#order-history').append(`<li>Date: ${order.date}, Food ordered: ${order.food}, Cost: ${order.totalCost}`)
    })
    if ($('#order-history').text() === '') {
      $('#order-history').text('This customer hasn\'t placed any orders before!')
    }  
  },

  clearCustomerTab() {
    $('#booking-history').html('');
    $('#order-history').html('')
  }
}

export default DOMupdates;