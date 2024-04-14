import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {AuthService} from "../../../shared/auth/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService, private authService: AuthService, private formBuilder: FormBuilder) { }

  public formAuth: FormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
  })

  public submitForm(): void{
      if(this.formAuth.valid){
        this.authService.sign$(
          this.formAuth.get('username').value,
          this.formAuth.get('password').value
        ).subscribe(
          {
            next: value => value,
            error: (err) => {
              console.log(err)
            }
          }
        )
      }
  }
}
