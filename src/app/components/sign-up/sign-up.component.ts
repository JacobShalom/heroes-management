import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/model/trainer';
import { LoginAuthService } from 'src/services/login-auth.service';
import { TrainerService } from 'src/services/trainer.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  public nameInvalid = false;
  public passwordInvalid = false;
  private formSubmitAttempt = false;

  private loggedUrl: string;
  private loginUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginAuthService: LoginAuthService,
    private trainerService :TrainerService
  ) {

    this.loggedUrl = '/heroes'
    this.loginUrl = '/login'

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if ( this.loginAuthService.checkUserAuthenticated()) {
      this.router.navigate([this.loggedUrl]);
    }
  }

  goToLoginForm(){
    this.router.navigateByUrl(this.loginUrl);
  }



  onSubmit(){
    this.nameInvalid = false;
    this.passwordInvalid = false;
    this.formSubmitAttempt = false;
    let matchingTrainers : Trainer[] = [];
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        this.loginAuthService.signup(username, password).subscribe(
            trainer => { 
              if(trainer) 
              this.router.navigateByUrl(this.loggedUrl);
            else { this.nameInvalid = true; this.passwordInvalid = true} }
        );
      } catch (err) {
        this.nameInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}


