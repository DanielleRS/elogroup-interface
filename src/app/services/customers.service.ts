import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationApi } from '../api_database/comunication_api';
import { Customers } from '../models/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

    private api: CommunicationApi;

    constructor(private httpClient: HttpClient) {  }

    inicializarServicos() {

        this.api = new CommunicationApi();

        console.log('URL base api', this.api.getUrlBaseApi());
    }

    registerCustomer(leadId: number): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.getUrlBaseApi()}/leads/${leadId}/customer`;

        return this.httpClient.post(url, null);
    }
}
