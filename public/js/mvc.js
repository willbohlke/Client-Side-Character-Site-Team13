class PageModel {   //XMLHttpRequests
    GetData() {
        // ...
        return data;
    }

}

class PageView {    //Template Code
    CreateDivs(data) {
        // ...
        let root = document.querySelector('#root');
        root.innerHTML = template;
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