class Hotel {
  constructor(guestData, roomData, bookingData, roomServiceData) {
    this.guests = guestData.users;
    this.rooms = roomData.rooms;
    this.bookings = bookingData.bookings;
    this.foodOrders = roomServiceData.roomServices;
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

    return availableRooms;
  }

  getOccupancy(date) {
    return 100 - ((this.getRoomsAvailable(date).length / 50) * 100);
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
}

export default Hotel;