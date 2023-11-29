class PageModel {   //XMLHttpRequests
    GetData(id) {
        // ...
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
            }
        }
        let url = `/api/character/${id}`;
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("Accept", "api/character");
        xhttp.send();
        

        return data;
    }

}

class PageView {    //Template Code
    CreateDivs(data) {
        // ...
        let content = document.querySelector('#content');
        content.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.desc}</p>
            <img src="${data.image}" alt="${data.name}">
        `;
    }
}



class PageController {  //Event Listeners (In Asynchronous Code)
    constructor(pageModel, pageView) {
        this.pageModel = pageModel;
        this.pageView = pageView;

        this.LoadPage();
    }

    LoadPage() {
        let data = this.pageModel.GetData();
        this.pageView.CreateDivs(data);
    }
}

const app = new PageController(new PageModel(), new PageView());