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