import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpContext } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandingPage } from './pages/landing/landing.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CatchPokemonButtonComponent } from './components/catch-pokemon-button/catch-pokemon-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    PokemonCataloguePage,
    TrainerPage,
    LoginFormComponent,
    PokemonListComponent,
    PokemonListItemComponent,
    NavbarComponent,
    CatchPokemonButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
