import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})

export class LandingPage {

  constructor(private readonly router: Router) {}

  handleLogin(): void {
    this.router.navigateByUrl("/pokemons")
  }
}
