'use strict';

var mongoose = require('mongoose'),
  jwt    = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  config = require('../secret'),
  Task = mongoose.model('Usuario');

exports.list_all_usuario = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_usuario = function(req, res) {
  req.body.Password = bcrypt.hashSync(req.body.Password, 8);
  var new_usuario = new Task(req.body);
  new_usuario.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

// Request referentes a token
exports.read_a_usuario_me = function(req, res, next) {
  Task.findById(req.userId, { password: 0 }, function (err, task) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!task) return res.status(404).send("No user found.");
    res.status(200).send(task);
  });
};

exports.update_a_usuario_me = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.usuarioId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

//Elementos que se editan con el id
exports.read_a_usuario = function(req, res) {
  Task.findById(req.params.usuarioId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_usuario = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.usuarioId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_usuario = function(req, res) {

  Task.remove({
    _id: req.params.usuarioId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

//Obtener token por medio del login
exports.get_login_token = function(req, res) {
  Task.findOne({
    Correo: req.body.Correo
  }, function(err, task) {

    if (err) throw err;

    var passwordIsValid = bcrypt.compareSync(req.body.Password, task.Password);

    if (!task) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (task) {

      // Verficia si la contra coincide
      if (!passwordIsValid) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // Se crea un token con el id del usuario
        var token = jwt.sign({ id: task._id }, config.secret, {
          expiresIn: 86400  // expires in 24 hours
        });

        // retorna la informacion del token
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
};
