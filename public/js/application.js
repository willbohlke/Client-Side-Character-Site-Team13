//client requires the character data, use XMLHttpRequest to get /character
//GET /character is a REST API call accessed by the application router
//what am i gonna add to header
//loop through characters to get clickable buttons

function changeButtons() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
            var buttons = document.querySelectorAll("#top button");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].textContent = json[i].name;
            }
        }
    };
    xhttp.open("GET", "/api/character", true);
    xhttp.send();
}

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
    `
}
