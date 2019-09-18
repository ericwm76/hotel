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

  it('should return a guest\'s ID', () => {
    expect(hotel.getGuestID('Noemy Little')).to.equal(5);
  })

  it('should return the room numbers of all booked rooms on a given date', () => {
    expect(hotel.getBookedRooms('2019/10/10')).to.have.members([24, 25, 28]);
  })

  it('should return all available rooms for a given date', () => {
    expect(hotel.getAvailableRoomNumbers('2019/10/10')).to.not.have.members([24, 25, 28]);
  })

  it('should return the occupancy rate for a given date', () => {
    expect(hotel.getOccupancy('2019/10/10')).to.equal(6);
  })

  it('should return all food orders for a given date', () => {
    expect(hotel.getAllFoodOrders("2019/09/16")).to.eql([{
        userID: 86,
        date: "2019/09/16",
        food: "Incredible Concrete Sandwich",
        totalCost: 24.77
    }]);
  })

  it('should return room revenue for a given date', () => {
    expect(hotel.getRoomRevenue('2019/10/10')).to.equal(698.20);
  })

  it('should return food order revenue for a given date', () => {
    expect(hotel.getFoodRevenue('2019/09/16')).to.equal(24.77);
  })

  it('should return total revenue for a given date', () => {
    expect(hotel.getTotalRevenue("2019/09/25")).to.equal(402.70);
  })

  it('should be able to create a new guest', () => {
    let id = hotel.createNewGuest('Shirley Temple');
    expect(hotel.guests[id - 1].name).to.equal('Shirley Temple');
  })

  it('should be able to find a current guest\'s booking and food order history', () => {
    hotel.findCurrentGuestInfo("Marvin Lang");
    expect(hotel.currentGuest.customer.name).to.equal("Marvin Lang");
  })

  it('should return an array of all the dates that have bookings', () => {
    expect(hotel.findDatesArray().length).to.equal(54);
  })

  it('should find the most popular booking dates all time', () => {
    expect(hotel.findMostPopularDates()).to.eql([ '2019/09/01', '2019/09/13', '2019/10/10' ])
  })

  it('should find the least popular booking dates all time', () => {
    expect(hotel.findLeastPopularDates().length).to.eql(35)
  })
});