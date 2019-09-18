class Customer {
  constructor(customer, customerBookings, customerFoodOrders) {
    this.customer = customer;
    this.customerBookings = customerBookings;
    this.customerFoodOrders = customerFoodOrders;
  }

  createNewBooking(date, number) {
    this.customerBookings.push({userID: this.customer.id, date: date, roomNumber: number});
    console.log(this.customerBookings)
  }
}

export default Customer;