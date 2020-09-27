import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LeadsEntity } from '../models/leadsEntity';
import { LeadsService } from '../services/leads.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDataComponent } from '../modal-data/modal-data.component';
import { CustomersService } from '../services/customers.service';
import { Customers } from '../models/customers';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  @Output() public allLeads: LeadsEntity;
  private listAllLeads: Subscription;
  public customerSubscription: Subscription;
  public updateLeadSubscription: Subscription;
  private listAll;
  private listAllStatus;
  private statusId;
  private dateModal;

  prospect = [];
  confirmedData = [];
  scheduledMeeting = [];

  status: any = [];

  teste: number;

  constructor(
    private router: Router, 
    private leadService: LeadsService, 
    private customerService: CustomersService,
    route: ActivatedRoute, 
    public dialog: MatDialog
  ) { 
    route.params.subscribe(val => {
      this.listLeads();
    });
  }

  newLead() {
    this.router.navigate(['new-lead']);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.item);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    if(event.previousContainer.id == "prospect") {
      this.saveCustomer(event.item.element.nativeElement.id);
    }

    if(event.previousContainer.id === "confirmedData") {
      this.openDialog(parseInt(event.item.element.nativeElement.id));
    }
  }

  openDialog(id) {
    let dialogRef= this.dialog.open(ModalDataComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.dateModal = result;
      this.updateLead(id, this.dateModal);
    });
  }

  listLeads() {
    this.allLeads = null;
    this.listAllLeads =
        this.leadService.listAllLeads()
        .subscribe(
            (result) => {
              this.allLeads = result;
              console.log(this.allLeads);
              this.listAll = this.allLeads;
              if(this.listAll.length !== 0)
                this.listAccordingToStatus();
            },
            (err) => {
              console.log(err);
            }
        );
  }

  listAccordingToStatus(){
    this.listAll.leads.map(item => {
      if(item.status.description == "Cliente em Potencial") {
        this.prospect.push(item);
      } else if(item.status.description == "Dados Confirmados") {
        this.confirmedData.push(item);
      } else if(item.status.description == "Reunião Agendada") {
        this.scheduledMeeting.push(item);
      }
    });
  }

  saveCustomer(lead) {
    this.customerSubscription =
    this.customerService.registerCustomer(lead, "Dados Confirmados")
    .subscribe(
        (retorno) => {
            console.log(retorno);
        },
        (err) => {
            console.log(err);
        }
    );
  }

  updateLead(lead, date) {
    const body = {
      date: date,
      statusDescription: "Reunião Agendada"
    };
    this.updateLeadSubscription =
    this.leadService.updateLeadInformations(lead, body)
    .subscribe(
        (retorno) => {
            console.log(retorno);
        },
        (err) => {
            console.log(err);
        }
    );
  }

  ngOnInit(): void {
    
  }

}
