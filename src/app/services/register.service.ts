import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationApi } from '../api_database/comunication_api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private api: CommunicationApi;

    constructor(private httpClient: HttpClient) {  }

    inicializarServicos() {

        this.api = new CommunicationApi();

        console.log('URL base api', this.api.getUrlBaseApi());
    }

    registerUser(body: any): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.getUrlBaseApi()}/users`;

        return this.httpClient.post(url, body);
    }
}
