function handleButtonClick(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
            var character = json[id];
            createModal(character);
        }
    };
    xhttp.open("GET", "/api/character/", true);
    xhttp.send();
}

function createModal(character) {
    var modal = document.createElement('div');
    modal.setAttribute('class', 'modal fade');
    modal.setAttribute('id', 'characterModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'characterModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered" style="transform: translate(0, -35%);">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="characterModalLabel">${character.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${character.desc}
                </div>
            </div>
        </div>
    `;
    document.querySelector('.container').appendChild(modal);

    var myModal = new bootstrap.Modal(document.getElementById('characterModal'), {});
    myModal.show();

    document.getElementById('characterModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
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
                if (filter === 'all' ||
                    (filter === 'universe1' && json[i].Universe === 1) ||
                    (filter === 'universe2' && json[i].Universe === 2) ||
                    (filter === 'universe3' && json[i].Universe === 3) ||
                    (filter === 'favorites' && localStorage.getItem('favorite-' + json[i].id) === 'true')) {
                    var card = createCard(json[i]);
                    characterCards.appendChild(card);
                }
            }
        }
    };

    xhttp.open("GET", "/api/character", true);
    xhttp.send();
}
function handleFilterChange() {
    var filterSelect = document.getElementById('filter');
    var selectedFilter = filterSelect.value;
    updateCharacterCards(selectedFilter);
}

function createCard(character) {  // Evan modified the createCard function a little bit to include the heart icon for the favorites button
    var card = document.createElement("div");
    var img = document.createElement("img");
    var cardBody = document.createElement("div");
    var cardTitle = document.createElement("h5");
    

    card.setAttribute("class", "card");
    card.setAttribute("style", "width: 18rem; margin: 10px; border-radius: 15px; border: 1px solid gray; box-shadow: 5px 5px 5px gray; background-color: solid white;");
    
    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", character.image);
    img.setAttribute("style", "border-radius: 15px;");

    //section for heart icon
    var heartIcon = document.createElement("img");
    heartIcon.setAttribute("src", "/heart-fill.svg");
    heartIcon.setAttribute("class", "favorite-heart");
    if (localStorage.getItem('favorite-' + character.id) === 'true') {
        heartIcon.classList.add('is-favorite');
    }
    heartIcon.style.position = "absolute";
    heartIcon.style.top = "10px";
    heartIcon.style.right = "10px";
    heartIcon.style.width = "20px"; 
    heartIcon.style.height = "20px"; 
    heartIcon.style.cursor = "pointer";
    heartIcon.onclick = function(event) {
        event.stopPropagation();
        toggleFavorite(character.id, heartIcon);
    };

    cardBody.setAttribute("class", "card-body");
    cardTitle.setAttribute("class", "card-title text-center");
    cardTitle.setAttribute("style", "font-family: 'Helvetica', sans-serif; font-weight: bold;");
    cardTitle.textContent = character.name;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(img);
    card.appendChild(cardBody);
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