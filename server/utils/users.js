[{
  id: 'tg79bfdbsfbEF24',
  name: 'Sasheem',
  room: 'GoT fans'
}]

// addUser(id, name, room)
// removeUser(id) - socketID
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
  getUser(id) {
    // var users = this.users.filter((user) => user.id === id)[0];
    return this.users.find((user) => user.id === id);
  }
  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    // var users = this.users.filter((user) => {
    //   return user.room === room;
    // });
    
    return namesArray;
  }
}

module.exports = {Users};
