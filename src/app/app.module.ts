import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { AppComponent } from './app.component';

import { LeadsComponent } from './leads/leads.component';
import { NewLeadComponent } from './new-lead/new-lead.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { ModalDataComponent } from './modal-data/modal-data.component';


@NgModule({
  declarations: [
    AppComponent,
    LeadsComponent,
    NewLeadComponent,
    RegisterComponent,
    ModalDataComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [ModalDataComponent]
})
export class AppModule { }
