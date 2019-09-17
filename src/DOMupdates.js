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
  }








}

export default DOMupdates;