import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Leads } from '../models/leads';
import { LeadsService } from '../services/leads.service';

@Component({
  selector: 'app-new-lead',
  templateUrl: './new-lead.component.html',
  styleUrls: ['./new-lead.component.css']
})
export class NewLeadComponent implements OnInit {
  
  private solicitarCadastroLeadSubscription: Subscription;
  private leads: Leads;

  formRegister = this.fb.group({
    'name': ['', [Validators.required]],
    'phone': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'opportunities': ['', ''],
  });

  error = false;

  opportunitiesSelected = [];

  constructor(
    private fb: FormBuilder, 
    private leadService: LeadsService, 
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }

  checkAllOpportunities = { id: 0, name: '', isSelected: false }

  checkOpportunities = [
    { id: 0, name: 'RPA', isSelected: false },
    { id: 1, name: 'Produto Digital', isSelected: false },
    { id: 2, name: 'Analytics', isSelected: false },
    { id: 3, name: 'BPM', isSelected: false }
  ];

  checkAllChecks(check) {
    this.checkAllOpportunities.isSelected = check;
    if(this.checkAllOpportunities.isSelected) {
      this.checkOpportunities.map(item => {
        item.isSelected = true;
      })
    } else {
      this.checkOpportunities.map(item => {
        item.isSelected = false;
      })
    }
  }

  checkCheck(item, check) {
    this.checkOpportunities[item.id].isSelected = check;
    if(this.checkOpportunities[item.id].isSelected) {
      this.checkOpportunities[item.id].isSelected = true;
    } else {
      this.checkOpportunities[item.id].isSelected = false;
    }
  }

  validate(lead) {
    this.error = false;
    
    if(lead.customerName === "" || lead.customerName === undefined) {
      this.error = true;
      alert("É obrigatório o preenchimento do nome.");
    }

    if(lead.customerPhone === "" || lead.customerPhone === undefined) {
      this.error = true;
      alert("É obrigatório o preenchimento do telefone.");
    }

    if(lead.customerEmail === "" || lead.customerEmail === undefined) {
      this.error = true;
      alert("É obrigatório o preenchimento do e-mail.");
    }

    if(lead.opportunities.length == 0) {
      this.error = true;
      alert("É obrigatório selecionar pelo menos uma oportunidade.");
    }
  }

  checkOpportunitiesSelected() {
    this.checkOpportunities.map(item => {
      if(item.isSelected == true) {
        this.opportunitiesSelected.push(item.name);
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
  }

  save() {
    this.checkOpportunitiesSelected();
    const lead: Leads = {
      customerName: this.formRegister.value.name,
      customerPhone: this.formRegister.value.phone,
      customerEmail: this.formRegister.value.email,
      opportunities: this.opportunitiesSelected,
    }
    this.validate(lead);
    this.formRegister.reset();

    if(this.error !== true) {
      this.solicitarCadastroLeadSubscription =
      this.leadService.registerLead(lead)
      .subscribe(
          (retorno) => {
              console.log(retorno);
              this.openSnackBar("Lead incluído com sucesso!", "");
              this.router.navigate(['/leads']);
          },
          (err) => {
              console.log(err);
          }
      );
    }
  }

  ngOnInit(): void {
  }

}
