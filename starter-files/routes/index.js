const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));


router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('')
  res.send(reverse);
})

router.get('/about', (req, res) => {
  res.send('You\'re on the about page');
});

module.exports = router;
