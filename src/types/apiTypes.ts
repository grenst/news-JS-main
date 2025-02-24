export interface ISource {
    id: string;
    name: string;
}

export interface IArticle {
    source: ISource;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
}

export interface IApiResponse {
    status: string;
    totalResults: number;
    articles?: IArticle[];
    sources?: ISource[];
}
