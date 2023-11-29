let xhttp = new XMLHttpRequest();
xhttp.open("GET", "/api/character", false);
xhttp.send();
var json = JSON.parse(xhttp.responseText);

function changeContent(character) {
    var content = document.querySelector('#content');
    content.innerHTML = `
        <h2>${character.name}</h2>
        <p>${character.desc}</p>
        <img src="${character.image}" alt="${character.name}">
    `;
}

function createButtons() {
    if (xhttp.status == 200) {
        var top = document.querySelector('#top');
        for (var i = 0; i < json.length; i++) {
            var button = document.createElement('button');
            let character = json[i];
            button.onclick = function() { changeContent(character) };
            button.textContent = json[i].name;
            top.appendChild(button);
        }
    }
}
