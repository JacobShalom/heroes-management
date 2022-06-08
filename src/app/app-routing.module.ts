import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'heroes', component: HeroesComponent /* , 
    children : [{ path: 'detail/:id', component: HeroCardComponent }]  */
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
