import AppLoader from './appLoader';
import { IApiResponse } from '../../types/apiTypes';

class AppController extends AppLoader {
    getSources(callback: (data: IApiResponse) => void, country: string = ''): void {
        const options: Record<string, string> = {};
        if (country) {
            options['country'] = country; // Добавляем параметр country в запрос
        }
    
        super.getResp(
            {
                endpoint: 'sources',
                options,
            },
            callback
        );
    }    

    getNews(e: Event, callback: (data: IApiResponse) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: { sources: sourceId },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
