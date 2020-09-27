import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationApi } from '../api_database/comunication_api';
import { Leads } from '../models/leads';
import { Status } from '../models/status';
import { LeadsEntity } from '../models/leadsEntity';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

    private api: CommunicationApi;

    constructor(private httpClient: HttpClient) {  }

    inicializarServicos() {

        this.api = new CommunicationApi();

        console.log('URL base api', this.api.getUrlBaseApi());
    }

    registerLead(body: Leads): Observable<any> {

        this.inicializarServicos();
        const url = `${this.api.getUrlBaseApi()}/leads`;

        return this.httpClient.post(url, body);
    }

    listAllLeads() : Observable<LeadsEntity> {
      this.inicializarServicos();
      const url = `${this.api.getUrlBaseApi()}/leads`;

      return this.httpClient.get<LeadsEntity>(url);
    }

    updateLeadInformations(leadId: number, statusId: number, body: Date): Observable<any> {
      this.inicializarServicos();
      debugger
      const url = `${this.api.getUrlBaseApi()}/leads/${leadId}/status/${statusId}`;

      const bodyDate = {
        "date": body
      }

      return this.httpClient.put(url, bodyDate);
    }

    getStatusByDescription(description: string) : Observable<string> {
      this.inicializarServicos();
      const url = `${this.api.getUrlBaseApi()}/leads/status/${description}`;

      return this.httpClient.get<string>(url);
    }
}
