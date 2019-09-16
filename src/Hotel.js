class Hotel {
  constructor(guestData, roomData, bookingData, roomServiceData) {
    this.guestData = guestData;
    this.roomData = roomData;
    this.bookingData = bookingData;
    this.foodData = roomServiceData;
  }

  getGuestName(id) {
    return this.guestData.users.find(user => {
      if (user.id === id) {
        return user.name;
      }
    })
  }

  getRoomsAvailable(date) {

  }

  getOccupancy(date) {

  }

  getAllFoodOrders(date) {

  }

  getRoomRevenue(date) {

  }

  getFoodRevenue(date) {

  }

  getTotalRevenue(date) {

  }
}

export default Hotel;