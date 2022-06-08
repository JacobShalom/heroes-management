import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'src/services/in-memory-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list'; 

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';


import { EditHeroDialogComponent } from './components/edit-hero-dialog/edit-hero-dialog.component';
import { AddHeroDialogComponent } from './components/add-hero-dialog/add-hero-dialog.component';


import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { MatSelectModule } from '@angular/material/select'; 

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';



@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroCardComponent,
    EditHeroDialogComponent,
    AddHeroDialogComponent,
    YesNoDialogComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
/*     HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false },
    ) , */
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
