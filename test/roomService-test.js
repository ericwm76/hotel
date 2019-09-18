import chai from 'chai';
import RoomService from '../src/RoomService.js';
import roomServiceSample from './sample-data/roomService-sample.js'
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

describe('Room Service', () => {
  let roomService = new RoomService(roomServiceSample);
})