import Customer from './Customer.js'

class Hotel {
  constructor(guestData, roomData, bookingData, roomServiceData) {
    this.guests = guestData.users;
    this.rooms = roomData.rooms;
    this.bookings = bookingData.bookings;
    this.foodOrders = roomServiceData.roomServices;
    this.currentGuest = { name: 'Please select a guest', id: 0 };
  }

  getGuestID(name) {
    return this.guests.find(guest => guest.name === name).id;
  }

  getGuestName(id) {
    return this.guests.find(guest => guest.id === id).name;
  }

  getBookedRooms(date) {
    return this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
  }

  getAvailableRoomNumbers(date) {
    let availableRoomNumbers = this.rooms.filter(room => {
      if (!this.getBookedRooms(date).includes(room.number)) {
        return room;
      }
    }).map(room => room.number);

    return availableRoomNumbers;
  }

  getOccupancy(date) {
    return 100 - ((this.getAvailableRoomNumbers(date).length / 50) * 100);
  }

  getAllFoodOrders(date) {
    return this.foodOrders.filter(order => order.date === date)
  }

  getRoomRevenue(date) {
    let bookedRooms = this.getBookedRooms(date);

    return this.rooms.reduce((acc, room) => {
      if (bookedRooms.includes(room.number)) {
        acc += room.costPerNight;
      }
      return acc;
    }, 0);
  }

  getFoodRevenue(date) {
    return this.foodOrders.filter(order => order.date === date).reduce((acc, order) => {
      acc += order.totalCost;
      return acc;
    }, 0)
  }

  getTotalRevenue(date) {
    return Math.round((this.getRoomRevenue(date) + this.getFoodRevenue(date)) *100) / 100;
  }

  findCurrentGuestInfo(guestName) {
    let id = this.getGuestID(guestName);
    let guest = this.guests.find(guest => guest.id === id);
    let guestBookings = this.bookings.filter(booking => booking.userID === id);
    let guestFoodOrders = this.foodOrders.filter(order => order.userID === id);

    this.currentGuest = new Customer(guest, guestBookings, guestFoodOrders);
    return this.currentGuest;
  }

  createNewGuest(guestName) {
    let newID = this.guests.length + 1;
    this.guests.push({ name: guestName, id: newID });
    return newID;
  }

  findBookingsAllDates() {
    return this.bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = 0;
      }
      acc[booking.date]++;
      return acc;
    }, {});
  }

  findDatesArray() {
    return Object.keys(this.findBookingsAllDates()).sort((a, b) => a - b);
  }

  findMostPopularDates() {
    let bookingsAllDates = this.findBookingsAllDates();
    let arr = Object.values(bookingsAllDates);
    let maxValue = Math.max(...arr);
    let mostPopularDates = Object.keys(bookingsAllDates).filter(date => bookingsAllDates[date] === maxValue);

    return mostPopularDates;
  }

  findLeastPopularDates() {
    let bookingsAllDates = this.findBookingsAllDates();
    let arr = Object.values(bookingsAllDates);
    let minValue = Math.min(...arr);
    let leastPopularDates = Object.keys(bookingsAllDates).filter(date => bookingsAllDates[date] === minValue);

    return leastPopularDates;
  }
}

export default Hotel;