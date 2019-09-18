import chai from 'chai';
import Customer from '../src/Customer.js';
import Hotel from '../src/Hotel.js';
import DOMupdates from '../src/DOMupdates.js';
import userSample from './sample-data/users-sample.js';
import roomsSample from './sample-data/rooms-sample.js';
import bookingsSample from './sample-data/bookings-sample.js';
import roomServiceSample from './sample-data/roomService-sample.js';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

describe('Customer', () => {
  let hotel, guest;

  beforeEach(function () {
    hotel = new Hotel(userSample, roomsSample, bookingsSample, roomServiceSample)
    guest = hotel.findCurrentGuestInfo('Talon Bayer')
  })

  it('should be an instance of Customer', () => {
    expect(guest).to.be.an.instanceOf(Customer)
  })

  it('should create a new booking', () => {
    expect(guest.customerBookings.length).to.equal(1);
    guest.createNewBooking('2019/09/17', 7);
    expect(guest.customerBookings.length).to.equal(2);
  })
})