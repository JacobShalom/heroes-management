import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from '../model/hero';
import { Ability } from 'src/model/ability';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {


  private heroesUrl = 'http://localhost:5000/api/heroes';
  private abilitiesUrl = 'http://localhost:5000/api/abilities';


   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; 

  constructor(private http: HttpClient , private logger : LoggerService) { }

  
  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.logger.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }


  getHeroes( trainerId :string): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.logger.log('fetched heroes')),       
        map(heroes => heroes.filter(f => f.trainerId === trainerId).sort((a, b) => b.power - a.power)),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

 
  addHero(hero : Hero): Observable<unknown> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.logger.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: string): Observable<unknown> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.logger.log(`deleted hero id=${id}`)),
      catchError(this.handleError('deleteHero'))
    );
  }


  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.logger.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  getAbilities( ): Observable<Ability[]> {
    return this.http.get<Ability[]>(this.abilitiesUrl)
      .pipe(
        tap(_ => this.logger.log('fetched abilities')),       
        catchError(this.handleError<Ability[]>('getAbilities', []))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.log(`${operation} failed: ${error.message}`);
      return of(result as T); //return T as Observable , Let the app keep running by returning an empty result. ??
    };
  }

}
