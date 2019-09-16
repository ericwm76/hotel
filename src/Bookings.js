class Booking {
  constructor(bookingData) {
    this.bookings = bookingData.bookings;
  }

  findMostPopularDates() {
    let bookingsAllDates = this.bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = 0;
      }
      acc[booking.date]++;
      return acc;
    }, {});

    let arr = Object.values(bookingsAllDates);
    let maxValue = Math.max(...arr);
    let mostPopularDates = Object.keys(bookingsAllDates).filter(date => bookingsAllDates[date] === maxValue);

    return mostPopularDates;
  }

  findLeastPopularDates() {
    let bookingsAllDates = this.bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = 0;
      }
      acc[booking.date]++;
      return acc;
    }, {});

    let arr = Object.values(bookingsAllDates);
    let minValue = Math.min(...arr);
    let leastPopularDates = Object.keys(bookingsAllDates).filter(date => bookingsAllDates[date] === minValue);

    return leastPopularDates;
  }
}

export default Booking;