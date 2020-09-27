const BASE_URL_API = 'https://localhost:5001/api';

export class CommunicationApi {

    private UrlBaseApiLocalhost: string;

    public constructor () {
        this.UrlBaseApiLocalhost = BASE_URL_API;
    }

    public getUrlBaseApi(): string {
        return this.UrlBaseApiLocalhost;
    }
}
