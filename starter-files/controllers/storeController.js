const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({message: 'That file type isn\'t allowed!'}, false);
    }
  }
};

exports.homePage = (req, res) => {
  console.log(req.name);
  const dogs = {name1: 'Eisor', name2: 'Repooc', title: 'Fuck'}
  req.flash('error', `Shit is broken!`);

  res.render('index', {...dogs});
}

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'Add Store'});
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if no new file to resize
  if (!req.file) {
    next(); // skips to next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
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
  // Set location data to a Point
  req.body.location.type = 'Point';

  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return new store instead of old store
    runValidators: true,
  }).exec();
  req.flash('success', `Successfuly updated <strong>${store.name}</strong> <a href="/stores/${store.slug}">View Store =></a>`)
  res.redirect(`/stores/${store._id}/edit`);
}

