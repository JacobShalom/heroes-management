import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';


import { Observable, of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';



import { Trainer } from 'src/model/trainer';
import { LoggerService } from './logger.service';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {


  private trainersUrl = 'http://localhost:5000/api/trainers';



   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; 

  constructor(private http: HttpClient , private logger : LoggerService) { }

  
  getTrainer(id: string): Observable<Trainer> {
    const url = `${this.trainersUrl}/${id}`;
    return this.http.get<Trainer>(url).pipe(
      tap(_ => this.logger.log(`fetched trainer id=${id}`)),
      catchError(this.handleError<Trainer>(`getTrainer id=${id}`))
    );
  }

  getTrainerByUserPassword( username: string, password: string): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.trainersUrl)
      .pipe(
        tap(_ => this.logger.log('fetched trainers')), 
        map(r => r.filter(f => (f.trainerName.toLowerCase() == username.toLowerCase()) && (f.password == password))),
        catchError(this.handleError<Trainer[]>('getTrainerByUserPassword', []))
      );
  }

  
  newTrainerByUserPassword( username: string, password: string): Observable<Trainer> {
    let newTrainer : Trainer = {
      id: Guid.create().toString(),
      trainerName: username,
      password: password
    };
    return this.http.post<Trainer>(this.trainersUrl, newTrainer, this.httpOptions).pipe(
      tap((newTrainer: Trainer) => this.logger.log(`added trainer w/ id=${newTrainer.id}`)),
      catchError(this.handleError<Trainer>('addTrainer'))
    );

  }

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.trainersUrl)
      .pipe(
        tap(_ => this.logger.log('fetched trainers')), 
        map(trainers => trainers),     
        catchError(this.handleError<Trainer[]>('getTrainers', []))
      );
  }

 
  addTrainer(trainer : Trainer): Observable<unknown> {
    return this.http.post<Trainer>(this.trainersUrl, trainer, this.httpOptions).pipe(
      tap((newTrainer: Trainer) => this.logger.log(`added trainer w/ id=${newTrainer.id}`)),
      catchError(this.handleError<Trainer>('addTrainer'))
    );
  }

  deleteTrainer(id: string): Observable<unknown> {
    const url = `${this.trainersUrl}/${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.logger.log(`deleted trainer id=${id}`)),
      catchError(this.handleError('deleteTrainer'))
    );
  }


  updateTrainer(trainer: Trainer): Observable<any> {
    return this.http.put(this.trainersUrl, trainer, this.httpOptions).pipe(
      tap(_ => this.logger.log(`updated trainer id=${trainer.id}`)),
      catchError(this.handleError<any>('updateTrainer'))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.log(`${operation} failed: ${error.message}`);
      return of(result as T); //return T as Observable , Let the app keep running by returning an empty result. ??
    };
  }

}
