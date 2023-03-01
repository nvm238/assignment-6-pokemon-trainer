import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage {

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  get pokemon(): Pokemon[] {
    if (this.trainerService.trainer){
      return this.trainerService.trainer.pokemon;
    }
    return [];
  }

  constructor(
    private trainerService: TrainerService
  ){}

}
