import chai from 'chai';
import Hotel from '../src/Hotel.js';
import DOMupdates from '../src/DOMupdates.js';
import userSample from './sample-data/users-sample.js';
import roomsSample from './sample-data/rooms-sample.js';
import bookingsSample from './sample-data/bookings-sample.js';
import roomServiceSample from './sample-data/roomService-sample.js';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
// chai.spy.on(DOMupdates, ['appendAnswer'], () => true);

describe('Hotel', () => {
  let hotel;

  beforeEach(function () {
    hotel = new Hotel(userSample, roomsSample, bookingsSample, roomServiceSample)
  })

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  })

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  })

  it('should return a guest\'s name', () => {
    expect(hotel.getGuestName(5)).to.equal('Noemy Little');
  })

  it('should return all available rooms for a given date', () => {
    expect(hotel.getRoomsAvailable('2019/10/10')).to.not.have.members([24, 25, 28]);
  })

  it('should return the occupancy rate for a given date', () => {
    expect(hotel.getOccupancy('2019/10/10')).to.equal(94);
  })

  it('should return all food orders for a given date', () => {
    expect(hotel.getAllFoodOrders("2019/09/16")).to.eql([{
        userID: 86,
        date: "2019/09/16",
        food: "Incredible Concrete Sandwich",
        totalCost: 24.77
    }]);
  })





});