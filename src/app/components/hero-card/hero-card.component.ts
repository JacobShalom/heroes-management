/* import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from 'src/data/hero';
import { HeroService } from 'src/services/hero.service';
import { Subscription } from 'rxjs'; */

import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit,EventEmitter ,Output} from "@angular/core";
import { Ability } from "src/model/ability";
import { Hero } from "src/model/hero";


@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class HeroCardComponent implements OnInit {

  @Input()
  hero: Hero | undefined;

  @Input()
  abilityDesc : string | undefined;

  @Output()
  deleteClicked:EventEmitter<Hero> = new EventEmitter<Hero>();
  
  @Output()
  editClicked:EventEmitter<Hero> = new EventEmitter<Hero>();

  state = 'collapsed';
  
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }
  
  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }

  delete(hero: Hero): void {
    this.deleteClicked.emit(hero);
  }

  edit(hero: Hero): void {
    this.editClicked.emit(hero);
  }

  
/*   id : string | null = null;
  parmaSub!: Subscription;
  state = 'collapsed';
  constructor(    private _Activatedroute: ActivatedRoute,
                  private heroService: HeroService,
                  private location: Location) { }

  ngOnInit(): void {
    this.parmaSub=this._Activatedroute.params.subscribe( params => { 
      this.heroService.getHero(params['id']).subscribe(hero => { this.hero = hero})});
};



ngOnDestroy() {
  this.parmaSub.unsubscribe();
}


  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  } */


}
