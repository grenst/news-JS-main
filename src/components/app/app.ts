import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IApiResponse } from '../../types/apiTypes';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesElement = document.querySelector('.sources');
        if (!sourcesElement) return;

        sourcesElement.addEventListener('click', (e: Event) => {
            this.controller.getNews(e, (data: IApiResponse) => this.view.drawNews(data));
        });

        this.controller.getSources((data: IApiResponse) => this.view.drawSources(data));
    }
}

export default App;
