import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage!: string
  errorCheck = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.errorCheck = true;
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value as unknown as Credentials)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigateByUrl('');
          },
          error: (err) => {
             this.errorMessage = err.error?.message ?? err.message
          },
        });
    }
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) this.router.navigateByUrl('');
  }
}
