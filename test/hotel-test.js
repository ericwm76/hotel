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
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });






});