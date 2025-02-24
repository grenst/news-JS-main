import { IApiResponse } from "../../types/apiTypes";

class Loader {
    private baseLink: string;
    private options: Record<string, string>;

    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Record<string, string> },
        callback: (data: IApiResponse) => void = () => { 
            throw new Error("No callback provided for GET response"); 
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }    

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        const params = new URLSearchParams(urlOptions).toString();
        return `${this.baseLink}${endpoint}?${params}`;
    }

    private load(
        method: string,
        endpoint: string,
        callback: (data: IApiResponse) => void,
        options: Record<string, string>
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<IApiResponse>)
            .then((data) => callback(data))
            .catch((err) => { 
                throw new Error(`Fetch error: ${err.message}`);
            });
    }
}

export default Loader;
