//client requires the character data, use XMLHttpRequest to get /character
//GET /character is a REST API call accessed by the application router
//what am i gonna add to header
//loop through characters to get clickable buttons

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
}

function createButtons() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
            for (var i = 0; i < json.length; i++) {
                var card = document.createElement("div");
                card.setAttribute("class", "card");
                card.setAttribute("style", "width: 18rem;");
                card.textContent = json[i].name;
                //button.setAttribute("onclick", `handleButtonClick(${i})`);
                document.querySelector('.container').appendChild(card);
            }
            
        }
    };
    xhttp.open("GET", "/api/character", true);
    xhttp.send();
}