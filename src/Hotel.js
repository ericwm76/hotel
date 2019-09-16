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

  getRoomsAvailable(date) {
    let bookedRooms = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);

    let availableRooms = this.rooms.filter(room => {
      if (!bookedRooms.includes(room.number)) {
        return room;
      }
    }).map(room => room.number);

    return availableRooms;
  }

  getOccupancy(date) {
    return (this.getRoomsAvailable(date).length / 50) * 100;
  }

  getAllFoodOrders(date) {
    return this.foodOrders.filter(order => order.date === date)
  }

  getRoomRevenue(date) {

  }

  getFoodRevenue(date) {

  }

  getTotalRevenue(date) {

  }
}

export default Hotel;