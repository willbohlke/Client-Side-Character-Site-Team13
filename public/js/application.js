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

            var modal = document.createElement('div');
            modal.setAttribute('class', 'modal fade');
            modal.setAttribute('id', 'characterModal');
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-labelledby', 'characterModalLabel');
            modal.setAttribute('aria-hidden', 'true');
            modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="characterModalLabel">${character.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${character.desc}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            `;
            document.querySelector('.container').appendChild(modal);

            var myModal = new bootstrap.Modal(document.getElementById('characterModal'), {});
            myModal.show();
        }
    };
    xhttp.open("GET", "/api/character/", true);
    xhttp.send();
}


function createButtons() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
            var row = document.createElement("div");
            document.querySelector('.container').appendChild(row);
            row.setAttribute("class", "row");
            for (var i = 0; i < json.length; i++) {
                var c = 0;

                
                var card = document.createElement("div");
                var img = document.createElement("img");
            
                document.querySelector('.row').appendChild(card);
                card.setAttribute("class", "card");
                card.setAttribute("style", "width: 18rem;");
                
                img.setAttribute("class", "card-img-top");
                img.setAttribute("src", json[i].image);
                
                card.textContent = json[i].name;
                
                
                card.appendChild(img);
                card.setAttribute("onclick", `handleButtonClick(${i})`);
            }
            
        }
    };
    xhttp.open("GET", "/api/character", true);
    xhttp.send();
}

//Filters Section
function updateCharacterCards(filter) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
            var characterCards = document.getElementById('characterCards');
            characterCards.innerHTML = '';

            for (var i = 0; i < json.length; i++) {
                // Apply filtering logic based on the selected filter
                if (filter === 'all' || json[i].universe === filter) {
                    var card = createCard(json[i]);
                    characterCards.appendChild(card);
                }
            }
        }
    };

    xhttp.open("GET", "/api/character", true);
    xhttp.send();
}

function createCard(character) {  // Evan modified the createCard function a little bit to include the heart icon for the favorites button
    var card = document.createElement("div");
    var img = document.createElement("img");
    

    card.setAttribute("class", "card");
    card.setAttribute("style", "width: 18rem; position: relative;");
    
    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", character.image);

    //section for heart icon
    var heartIcon = document.createElement("img");
    heartIcon.setAttribute("src", "/heart-fill.svg");
    heartIcon.setAttribute("class", "favorite-heart");
    if (localStorage.getItem('favorite-' + character.id) === 'true') {
        heartIcon.classList.add('is-favorite');
    }
    heartIcon.style.position = "absolute";
    heartIcon.style.bottom = "10px";
    heartIcon.style.right = "10px";
    heartIcon.style.width = "30px"; 
    heartIcon.style.height = "30px"; 
    heartIcon.style.cursor = "pointer";
    heartIcon.onclick = function(event) {
        event.stopPropagation();
        toggleFavorite(character.id, heartIcon);
    };;

    var textContainer = document.createElement("div");
    textContainer.textContent = character.name;
    textContainer.setAttribute("class", "card-body"); 

    card.appendChild(img);
    card.appendChild(textContainer); 
    card.appendChild(heartIcon); 

    card.setAttribute("onclick", `handleButtonClick(${character.id})`);

    return card;
}


function createButtons() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
            var characterCards = document.getElementById('characterCards');

            for (var i = 0; i < json.length; i++) {
                var card = createCard(json[i]);
                characterCards.appendChild(card);
            }
        }
    };

    xhttp.open("GET", "/api/character", true);
    xhttp.send();
}

//Evan's toggle favorites function
function toggleFavorite(characterId, heartIcon) {
    var isFavorite = heartIcon.classList.contains('is-favorite');
    if (isFavorite) {
        localStorage.setItem('favorite-' + characterId, 'false');
        heartIcon.classList.remove('is-favorite');
    } else {
        localStorage.setItem('favorite-' + characterId, 'true');
        heartIcon.classList.add('is-favorite');
    }
}