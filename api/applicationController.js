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

}


module.exports = application;
