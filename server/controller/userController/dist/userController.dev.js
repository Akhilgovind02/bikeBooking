"use strict";

var User = require('../../model/userModel');

var jwt = require('jsonwebtoken');

var axios = require('axios');

var bcrypt = require('bcrypt');

var bcryptjs = require('bcryptjs');

require('dotenv').config();

var awsEmailResisterUrl = '';

var createUser = function createUser(req, res) {
  var userExists, saltRounds, hashedPassword, user;
  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(req.body); // check if the user already exists

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 4:
          userExists = _context.sent;

          if (!userExists) {
            _context.next = 7;
            break;
          }

          throw new Error("User already exists");

        case 7:
          // hash the password
          saltRounds = 10;
          hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
          req.body.password = hashedPassword; // save the user

          user = new User(req.body);
          user.code = Date.now();
          _context.next = 14;
          return regeneratorRuntime.awrap(user.save());

        case 14:
          res.status(201).send({
            success: true,
            message: "User registered successfully!"
          });
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          res.send({
            success: false,
            message: _context.t0.message
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

var login = function login(req, res) {
  var user, token;
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log(req.body);
          console.log(process.env.SECRET_KEY1); // check if the user exists

          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          throw new Error("User does not exist");

        case 8:
          if (!(req.body.password !== user.passwordConfirm)) {
            _context2.next = 10;
            break;
          }

          throw new Error('Unable to login 2');

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 12:
          token = _context2.sent;
          console.log(token);
          res.send({
            success: true,
            data: token,
            message: "User logged in successfully",
            user: user
          });
          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send({
            success: false,
            message: _context2.t0.message
          });
          console.log(_context2.t0);

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

var logout = function logout(req, res) {
  var token, authorization, decoded, user, alreadyInvalidated;
  return regeneratorRuntime.async(function logout$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          authorization = req.get('authorization');

          if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.substring(7);
          }

          decoded = jwt.decode(token);
          _context3.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            _id: decoded._id
          }));

        case 6:
          user = _context3.sent;
          if (!user) res.status(400).send('token is corrupted');
          _context3.next = 10;
          return regeneratorRuntime.awrap(User.find({
            invalidatedTokens: token
          }));

        case 10:
          alreadyInvalidated = _context3.sent;
          if (alreadyInvalidated.length === 0) user.invalidatedTokens.push(token);
          user.invalidatedTokens = user.invalidatedTokens.filter(function (token) {
            var _jwt$decode = jwt.decode(token),
                exp = _jwt$decode.exp;

            if (Date.now() >= exp * 1000) return false;else return true;
          });
          _context3.next = 15;
          return regeneratorRuntime.awrap(user.save());

        case 15:
          res.send('You Logged out');
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          res.status(500).send({
            error: _context3.t0.message || _context3.t0.toString()
          });

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

var updateUser = function updateUser(req, res) {
  var id, usr, userOld, user, token;
  return regeneratorRuntime.async(function updateUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.user._id;
          usr = req.body;
          _context4.next = 5;
          return regeneratorRuntime.awrap(User.findById(id).exec());

        case 5:
          userOld = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(id, usr, {
            "new": true
          }).exec());

        case 8:
          user = _context4.sent;
          _context4.next = 11;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 11:
          token = _context4.sent;

          if (user.email !== userOld.email || !user.isEmailRegistered) {
            axios.post(awsEmailResisterUrl, {
              InstructorEmail: user.email
            }).then(function (res) {
              console.log('email resistered: ' + res);
              User.findByIdAndUpdate(id, {
                isEmailRegistered: true
              }).exec();
            })["catch"](function (err) {
              console.log("can't resister email: " + err);
              User.findByIdAndUpdate(id, {
                isEmailRegistered: false
              }).exec();
            });
          } else {
            console.log("email is not changed or already registered");
          }

          res.status(201).send({
            user: user,
            token: token
          });
          _context4.next = 19;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          res.status(400).send(_context4.t0);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var deleteUser = function deleteUser(req, res) {
  var userId;
  return regeneratorRuntime.async(function deleteUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.params.userId; // Assuming the user ID is passed as a URL parameter

          console.log("userId", userId); // Find the user by ID and remove it from the database

          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(userId));

        case 5:
          res.status(200).send('User deleted successfully');
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(500).send('Failed to delete user');

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var me = function me(req, res) {
  return regeneratorRuntime.async(function me$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res.send(req.user);

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var usersList = function usersList(req, res) {
  var users;
  return regeneratorRuntime.async(function usersList$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context7.sent;
          console.log("Users:", users);
          res.send(users);
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.error("Error fetching users:", _context7.t0.message);
          res.status(500).send("Internal Server Error");

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

module.exports = {
  createUser: createUser,
  login: login,
  updateUser: updateUser,
  logout: logout,
  deleteUser: deleteUser,
  me: me,
  usersList: usersList
};