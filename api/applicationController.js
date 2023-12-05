const fs = require('fs');
const path = require("path");

class application {

    getAllCharacters() {
        this.template = fs.readFileSync(path.resolve('./api/character/applicationData.json'));
        return this.template;
    }

    getCharacterById(id) {
        this.character = this.template = fs.readFileSync(path.resolve('./api/character/applicationData.json'));

        return this.character.find(character => character.id == id);
    }

    //for favorites button
    constructor() {
        this.favorites = {}; 
    }
    toggleFavorite(id) {
        if (typeof this.favorites[id] === 'undefined') {
            this.favorites[id] = true; 
        } else {
            this.favorites[id] = !this.favorites[id]; 
        }
        return this.favorites[id];
    }

}


module.exports = application;
