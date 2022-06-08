import { Component, OnInit } from '@angular/core';
import { Ability } from 'src/model/ability';
import { Hero } from 'src/model/hero';
import { Trainer } from 'src/model/trainer';
import { HeroService } from 'src/services/hero.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditHeroDialogComponent } from 'src/app/components/edit-hero-dialog/edit-hero-dialog.component';
import { AddHeroDialogComponent } from 'src/app/components/add-hero-dialog/add-hero-dialog.component';
import { Guid } from 'guid-typescript';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import { LoginAuthService } from 'src/services/login-auth.service';
import { Router } from '@angular/router';


 

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  trainer:Trainer =  { id: '', trainerName: '' , password: ''} ;

  heroes: Hero[] = [];
  abilities: Ability[] = [];


  title: string =   `loading ...`;
  loggindUrl : string = '/login';


  constructor(private heroService : HeroService, 
    private dialog: MatDialog,
    private router: Router,
    private loginAuthService: LoginAuthService) {
      
    }

  ngOnInit(): void {
    if(!this.loginAuthService.checkUserAuthenticated())
        this.router.navigateByUrl(this.loggindUrl);
    this.getTrainerAndHeroes();
    this.getAbilities();
  }


  getTrainerAndHeroes():void{
      this.loginAuthService.getUserAuthenticated().subscribe(
        trainer => {this.trainer = trainer,
                    this.getHeroes();
                  }
      )
  }
  getAbilities(): void {
    this.heroService.getAbilities()
      .subscribe(abilities => {this.abilities = abilities;}
        );
  }

  getAbility(abilityId:number){
      return this.abilities.find(f => f.abilityId === abilityId)?.abilityDesc
  }

  getHeroes(): void {
    this.heroService.getHeroes(this.trainer.id)
      .subscribe(heroes => {this.heroes = heroes;
                            this.setTitle();}
        );
  }



  add(): void {
    let hero : Hero = { id: Guid.create().toString(), 
      heroName: '' , 
      abilityId : 1 , 
      createdDate : new Date() , 
      power: 10,
      trainerId  : this.trainer.id};

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {'hero': hero ,'abilities': this.abilities };
    const dialogRef = this.dialog.open(AddHeroDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
                val => {if (val){
                  hero.abilityId = val.fc_abilityId;
                  hero.heroName = val.fc_heroName;
                  hero.power  = val.fc_power;
                  hero.createdDate = new Date();
                  this.heroService.addHero(hero).subscribe(
                      a => {this.getHeroes();}
                  );
                }}
    );
  }




  delete(hero: Hero): void {

    const  message:string = `Are you sure you want to delete Your Hero ${hero.heroName} ?`;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = message;
    const yesNoDialogRef = this.dialog.open(YesNoDialogComponent, dialogConfig);
    yesNoDialogRef.afterClosed().subscribe(
        (result: boolean) => {
                                if(result) {
                                    //this.heroes = this.heroes.filter(h => h !== hero);
                                    this.heroService.deleteHero(hero.id).subscribe(
                                        a => {this.getHeroes();}
                                    ) ;
                                }
                            }
    );
  }


  edit(hero:Hero) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {'hero': hero ,'abilities': this.abilities };
    const dialogRef = this.dialog.open(EditHeroDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
        val => {if (val){
          hero.abilityId = val.fc_abilityId;
          hero.heroName = val.fc_heroName;
          hero.power  = val.fc_power;
          this.heroService.updateHero(hero).subscribe();
          this.getHeroes();
        }}
    );
  }

  setTitle():void{
    this.title  = `Welcome ${this.trainer.trainerName}, ` + (this.heroes.length !== 0 ? `Here is your heroes list` : `Your hero list is empty`);
  }
}
