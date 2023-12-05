var path = require('path');
var express = require('express');
var router = express.Router();

var applicationController = require('../api/applicationController');


router.get('/character', function(req, res, next) {

    appController = new applicationController();
    json = appController.getAllCharacters();
    res.send(json);
});

router.get('/character/:id', function(req, res, next) {

    appController = new applicationController();
    json = appController.getCharacterById(req.params.id);
    res.send(json);
});

router.post('/toggle-favorite/:id', function(req, res) {
    const isFavorite = appController.toggleFavorite(req.params.id);
    res.json({ isFavorite: isFavorite });
});

module.exports = router;