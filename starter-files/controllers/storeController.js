const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  console.log(req.name);
  const dogs = {name1: 'Eisor', name2: 'Repooc', title: 'Fuck'}
  res.render('index', {...dogs});
}

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'Add Store'});
}

exports.createStore = async (req, res) => {
  const store = new Store(req.body);
  await store.save();
  res.redirect('/');
}
