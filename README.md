# Ormy

[![NPM Version](https://badge.fury.io/js/ormy.png)](http://badge.fury.io/js/ormy)
[![Build Status](https://travis-ci.org/lighterio/ormy.png?branch=master)](https://travis-ci.org/lighterio/ormy)
[![Code Coverage](https://coveralls.io/repos/lighterio/ormy/badge.png?branch=master)](https://coveralls.io/r/lighterio/ormy)
[![Dependencies](https://david-dm.org/lighterio/ormy.png?theme=shields.io)](https://david-dm.org/lighterio/ormy)
[![Support](http://img.shields.io/gittip/zerious.png)](https://www.gittip.com/lighterio/)

Ormy is a Node.js Object Relational Mapping library. It currently supports
MySQL and Sqlite3.

## Getting started

Get a new database connection.

```javascript
var db = require('ormy')(
  type: 'mysql',
  host: 'localhost'
  port: 3306,
  user: 'root',
  pass: 'my_password',
  name: 'my_db'
});

var User = db.define({
  table: 'users',
  fields: {
    email: 'string',
    firstName: 'string',
    lastName: 'string'
  },
  methods: {
    hello: function () {
      return 'Hello, ' + this.firstName + '!';
    }
  }
});

User.create({
  email: 'ormy@lighter.io',
  firstName: 'Ormy',
  lastName: 'Team'
}, function (err, item) {
  console.log('Created item: ', item);
});

User.create([{
  email: 'ormy@lighter.io',
  firstName: 'Ormy',
  lastName: 'Team'
}, {
  email: 'ligher@lighter.io',
  firstName: 'Lighter',
  lastName: 'Team'
}], function (err, items) {
  console.log('Created array of items: ', items);
});

User.get(1, function (err, item) {
  console.log('User with ID 1: ', item);
});

User.get({email: 'ormy@lighter.io'}, function (err, item) {
  console.log('User with Ormy Email: ', item);
});

User.find({lastName: "Team"}, function (err, items) {
  console.log('"Team" users: ', items);
  items.forEach(function (item) {
    item.lastName = 'Core';
    item.save();
  })
});


```
