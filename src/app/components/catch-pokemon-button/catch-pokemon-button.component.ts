import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CaughtService } from 'src/app/services/caught.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent {

  public isCaught: boolean = false;

  @Input() pokemonId: string = "";

  get loading(): boolean {
    return this.caughtService.loading;
  }

  constructor(
    private trainerService: TrainerService,
    private readonly caughtService: CaughtService
  ) {}

  ngOnInit(): void {
    this.isCaught = this.trainerService.inCaught(this.pokemonId);
  }

  onCatchClick(): void {
    this.caughtService.addToCaughtPokemon(this.pokemonId)
      .subscribe({
        next: (trainer: Trainer) => {
          this.isCaught = this.trainerService.inCaught(this.pokemonId);
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message);
        }
      })

  }
}
