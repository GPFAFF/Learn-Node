const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  console.log(req.name);
  const dogs = {name1: 'Eisor', name2: 'Repooc', title: 'Fuck'}
  req.flash('error', `Shit is broken!`);

  res.render('index', {...dogs});
}

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'Add Store'});
}

exports.createStore = async (req, res) => {
  const store = await(new Store(req.body)).save();
  await store.save();
  req.flash('success', `Successfully created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
}

exports.getStores = async (req, res) => {
  // Query the database for a list of all stores
  const stores = await Store.find();
  console.log(stores);
  res.render('stores', {title: 'stores', stores});
}

exports.editStore = async (req, res) => {
  // Find store given id
  // Confirm they are owner of store
  // Render out edit form so user can update page
  const store = await Store.findOne({ _id: req.params.id});
  res.render('editStore', {title: `Edit ${store.name}`, store});
}

exports.updateStore = async (req, res) => {
  // Find store given id
  // Redirect to store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return new store instead of old store
    runValidators: true,
  }).exec();
  req.flash('success', `Successfuly updated <strong>${store.name}</strong> <a href="/stores/${store.slug}">View Store =></a>`)
  res.redirect(`/stores/${store._id}/edit`);
}

