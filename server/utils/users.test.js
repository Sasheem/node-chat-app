const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();

    users.users = [{
      id: '1',
      name: 'Anicia',
      room: 'node course'
    }, {
      id: '2',
      name: 'Justin',
      room: 'react course'
    }, {
      id: '3',
      name: 'Sajie',
      room: 'node course'
    }]
  });

  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Sasheem',
      room: 'GoT fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    // take an id from a seed user, pass to removeUser and assert that user
    // was actually removed
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    // take a fake id and not actually remove anything
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    // pass a valid user and get one back
    var userId = '1';
    var user = users.getUser(userId);
    expect(user).toBe(users.users[0]);
  });

  it('should not find a user', () => {
    // pass invalid id and make sure you do not get a user back
    var user = users.getUser('99');
    expect(user).toBe(undefined);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('node course');
    expect(userList).toEqual(['Anicia', 'Sajie']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('react course');
    expect(userList).toEqual(['Justin']);
  });
});
