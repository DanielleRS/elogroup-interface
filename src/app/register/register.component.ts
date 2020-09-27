import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from '../models/users';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private solicitarCadastroVisitanteSubscription: Subscription;
  private usuarioLogin: Users;

  error = false;

  formRegister = this.fb.group({
    'userName': ['', [Validators.required]],
    'password': ['', [Validators.required, Validators.minLength(8)]],
    'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
  });
  
  constructor(
    private fb: FormBuilder, 
    private registerService: RegisterService,
    private snackBar: MatSnackBar, 
    private router: Router
  ) { }

  validate(group: FormGroup) {
    this.error = false;
    
    if(group['userName'] === "" || group['userName'] === undefined) {
      this.error = true;
      alert("É obrigatório o preenchimento do nome.");
    }

    if(group['password'] === "" || group['password'] === undefined) {
      this.error = true;
      alert("É obrigatório o preenchimento da password.");
    }

    if(group['confirmPassword'] === "" || group['confirmPassword'] === undefined) {
      this.error = true;
      alert("É obrigatório o preenchimento da password.");
    }

    if(group['password'].value !== group['confirmPassword'].value) {
      this.error = true;
      alert("A senha e a confirmação de senha devem ser iguais.");
    }

    if(!group['password'].match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i)) {
      this.error = true;
      alert("A senha deve conter ao menos 8 caracteres, contentdo ao menos um caracter especial, um caracter numérico e um caracter alfanumérico.");
    }
  }

  register() {
    this.validate(this.formRegister.value);
    if(this.error !== true) {
      this.solicitarCadastroVisitanteSubscription =
      this.registerService.registerUser(this.formRegister.value)
      .subscribe(
          (retorno) => {
              let user: Users = {
                _id: retorno.payload.id,
                userName: retorno.payload.userName,
                password: retorno.payload.password,
              }

              this.formRegister.reset();
              this.router.navigate(['/leads']);
          },
          (err) => {
              console.log(err);
          }
      );
    } else {
      this.formRegister.reset();
    }
  }

  ngOnInit(): void {
  }

}
