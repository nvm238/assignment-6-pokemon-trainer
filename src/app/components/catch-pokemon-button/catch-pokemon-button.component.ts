import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CaughtService } from 'src/app/services/caught.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent {

  @Input() pokemonId: string = "";

  get loading(): boolean {
    return this.caughtService.loading;
  }

  constructor(
    private readonly caughtService: CaughtService
  ) {}

  onCatchClick(): void {
    this.caughtService.addToCaughtPokemon(this.pokemonId)
      .subscribe({
        next: (response: Trainer) => {
          console.log("NEXT", response);
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message);
        }
      })

  }
}
