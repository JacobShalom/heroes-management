import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, first, map, Observable, of, tap } from 'rxjs';
import { Trainer } from 'src/model/trainer';
import { LoggerService } from './logger.service';
import { TrainerService } from './trainer.service';
//import  * as bcrypt from 'bcrypt' ; 




@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; 

  trainersUrl : string = 'api/trainers';

  constructor(private http: HttpClient ,private router: Router , private logger : LoggerService , private trainerService :TrainerService ) {
  }

  checkUserAuthenticated(): boolean {
    let jwt_token : string|null = sessionStorage.getItem("jwt");
    return (jwt_token !== null);
  }

  getUserAuthenticated(): Observable<Trainer> {
    let jwt_token : string|null = sessionStorage.getItem("jwt");
    return this.trainerService.getTrainer(jwt_token!);
  }


  login(username: string, password: string  ): Observable<Trainer[]> {
    //let hashPass : string = await this.hashIt(password);
        return this.trainerService.getTrainerByUserPassword(username, password ).pipe(
          tap(trainers => {if(trainers.length == 1)  sessionStorage.setItem("jwt", `${trainers[0].id}`) })
        );

 }


 signup(username: string, password: string ) : Observable<Trainer> {
  //let hashPass : string = await this.hashIt(password);
  return this.trainerService.newTrainerByUserPassword(username, password).pipe(
    tap(newTrainer => { sessionStorage.setItem("jwt", `${newTrainer.id}`) })
  );
  }


/*   async hashIt(password : string){
    const salt = await bcrypt.genSalt(10);
    return( bcrypt.hash(password,  salt )) ;
  } */

}

/*             const response = await fetch(`/auth/login`, {
                                        method: 'POST',
                                        body: JSON.stringify({ username, password })
                                      })
            const { jwt_token } = await response.json()
            if (response.statusText !== 'SUCCESS') {
              this.logger.log('response status from auth service was ' + response.statusText);
              return(of(trainerUser));
            }
         sessionStorage.setItem("jwt", jwt_token)           
 */