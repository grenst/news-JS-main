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
        const countryButtons = document.querySelector('#countryButtons');
    
        if (!sourcesElement || !countryButtons) return;

        sourcesElement.addEventListener('click', (e: Event) => {
            this.controller.getNews(e, (data) => this.view.drawNews(data));
        });

        countryButtons.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
    
            if (target.tagName === 'BUTTON') {
                const selectedLanguage = target.getAttribute('data-country') || '';
                this.controller.getSources((data) => this.view.drawSources(data), selectedLanguage);

                document.querySelectorAll('#countryButtons button').forEach((btn) => {
                    btn.classList.remove('active');
                });

                target.classList.add('active');
            }
        });

        this.controller.getSources((data) => this.view.drawSources(data));
    }    
}

export default App;
