import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/model/trainer';
import { LoginAuthService } from 'src/services/login-auth.service';
import { TrainerService } from 'src/services/trainer.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;

  private loggedUrl: string;
  private signupUrl: string;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginAuthService: LoginAuthService,
    private trainerService :TrainerService
  ) {

    this.loggedUrl = '/heroes'
    this.signupUrl = '/signup'

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  goToSignUpForm()
  {
    this.router.navigateByUrl(this.signupUrl);
  }

  ngOnInit() {
    if (this.loginAuthService.checkUserAuthenticated()) {
      this.router.navigate([this.loggedUrl]);
    }
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    let matchingTrainers : Trainer[] = [];
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        this.loginAuthService.login(username, password).subscribe(
            trainers => {matchingTrainers = trainers ; 
              if(matchingTrainers.length == 1) 
              this.router.navigateByUrl(this.loggedUrl);
            else this.loginInvalid = true; }
        );
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}


