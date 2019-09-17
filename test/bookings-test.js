import chai from 'chai';
import Booking from '../src/Bookings.js';
import bookingsSample from './sample-data/bookings-sample.js';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
// chai.spy.on(DOMupdates, ['appendAnswer'], () => true);

describe('Bookings', () => {
  let booking = new Booking(bookingsSample);

  it('should find the most popular booking dates all time', () => {
    expect(booking.findMostPopularDates()).to.eql([ '2019/09/01', '2019/10/10', '2019/09/13' ])
  })

  it('should find the least popular booking dates all time', () => {
    expect(booking.findLeastPopularDates().length).to.eql(35)
  })
})