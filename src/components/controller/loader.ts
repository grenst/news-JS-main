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
        callback: (data: IApiResponse) => void = () => console.error('No callback for GET response')
    ): void {
        this.load('GET', endpoint, callback, options);
    }    

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            console.error(`Error ${res.status}: ${res.statusText}`);
            throw new Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        const params = new URLSearchParams(urlOptions).toString();
        return `${this.baseLink}${endpoint}?${params}`;
    }

    private load(method: string, endpoint: string, callback: (data: unknown) => void, options: Record<string, string>): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
