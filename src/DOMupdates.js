import $ from 'jquery';

const DOMupdates = {
  displayDate(date) {
    $('#todays-date').text(date);
  },

  displayRoomsAvail(number) {
    $('#rooms-avail').text(number)
  },

  displayOccupancy(number) {
    $('#occupancy').text(`${number}% of rooms are occupied on this date.`)
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







}

export default DOMupdates;