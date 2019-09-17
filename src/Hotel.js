import Customer from './Customer.js'

class Hotel {
  constructor(guestData, roomData, bookingData, roomServiceData) {
    this.guests = guestData.users;
    this.rooms = roomData.rooms;
    this.bookings = bookingData.bookings;
    this.foodOrders = roomServiceData.roomServices;
    this.currentGuest = { name: 'Please select a guest!', id: 0 };
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

  getRoomsAvailable(date) {
    let availableRooms = this.rooms.filter(room => {
      if (!this.getBookedRooms(date).includes(room.number)) {
        return room;
      }
    }).map(room => room.number);

    return availableRooms.length;
  }

  getOccupancy(date) {
    return 100 - ((this.getRoomsAvailable(date) / 50) * 100);
  }

  getAllFoodOrders(date) {
    return this.foodOrders.filter(order => order.date === date)
  }

  getRoomRevenue(date) {
    let bookedRooms = this.getBookedRooms(date);

    return Math.round(this.rooms.reduce((acc, room) => {
      if (bookedRooms.includes(room.number)) {
        acc += room.costPerNight;
      }
      return acc;
    }, 0) * 100) / 100;
  }

  getFoodRevenue(date) {
    return this.foodOrders.filter(order => order.date === date).reduce((acc, order) => {
      acc += order.totalCost;
      return acc;
    }, 0)
  }

  getTotalRevenue(date) {
    return this.getRoomRevenue(date) + this.getFoodRevenue(date);
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
    console.log('maxValue--->', maxValue)
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
    console.log('minValue--->', minValue)
    let leastPopularDates = Object.keys(bookingsAllDates).filter(date => bookingsAllDates[date] === minValue);

    return leastPopularDates;
  }
}

export default Hotel;