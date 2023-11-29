//client requires the character data, use XMLHttpRequest to get /character
//GET /character is a REST API call accessed by the application router
//what am i gonna add to header
//loop through characters to get clickable buttons

// get the character data
let xhttp = new XMLHttpRequest();
xhttp.open("GET", "/api/character", false);
xhttp.send();
var data = JSON.parse(xhttp.responseText);

function createButtons() {

    if (xhttp.status == 200) {
        var top = document.querySelector('#top');
        for (var i = 0; i < data.length; i++) {
            let template = 
            `<button onclick="changeContent()">{buttonname}</button>`;
            let btn = template.replace('{buttonname}', data[i].name);
            
            let newContent = changeContent(data[i]);

            //let element = document.querySelector('#top');
            //top.appendChild(newContent);
            //element.innerHTML = newContent2;

            var button = document.createElement('button');
            button.innerHTML = btn;
            //button.onclick = changeContent(data[i]);
            
            top.appendChild(button);

        }

      }

    }
/*
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
            var topDiv = document.querySelectorAll("#top");
            for (var i = 0; i < json.length; i++) {
                var button = document.createElement("button");
                button.textContent = json[i].name;
                button.id = json[i].id;
                button.onclick = function() { handleButtonClick(this.id); }; // Call handleButtonClick when the button is clicked
                topDiv.innerHTML = `testtttt`;
            }
        }
    };
    xhttp.open("GET", "/api/character", true);
    xhttp.send();
}
*/

function handleButtonClick(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            json = JSON.parse(xhttp.responseText);

            character = json[id];
            changeContent(character);
        }
    };
    xhttp.open("GET", "/api/character/", true);
    xhttp.send();
}

function changeContent(character) {
    let element = document.querySelector('#content');
    element.innerHTML = `
        <h2>${character.name}</h2>
        <p>${character.desc}</p>
        <img src="${character.image}" alt="${character.name}">
    `;
    return element.innerHTML;
}
