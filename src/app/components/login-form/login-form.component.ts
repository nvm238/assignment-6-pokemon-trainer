import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(private readonly LoginService: LoginService) { }

  public loginSubmit(loginForm: NgForm): void {

    const { username } = loginForm.value;

    this.LoginService.login(username)
      .subscribe({
        next: (trainer: Trainer) => {
          
        },
        error: () => {

        }
      })
  }
}
