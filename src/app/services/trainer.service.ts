import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer: Trainer | undefined;

  public get trainer(): Trainer | undefined{
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() { 
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
  }

  public inCaught(pokemonId: string): boolean {
    if(this._trainer){
      return Boolean(this.trainer?.pokemon.find((pokemon: Pokemon) => pokemon.name === pokemonId));
    }

    return false;
  }

  public addToCaught(pokemon: Pokemon): void {
    if(this._trainer) {
      this._trainer.pokemon.push(pokemon);
    }
  }

  public removeFromCaught(pokemonId: string): void {
    if(this._trainer) {
      this._trainer.pokemon = this._trainer.pokemon.filter((pokemon: Pokemon) => pokemon.name !== pokemonId);
      const alerts = [
        `${pokemonId} looked back at you with sad eyes before running off into the distance.`,
        `${pokemonId} hesitated before leaving, as if it didn't want to say goodbye.`,
        `As ${pokemonId} disappeared into the wild, you could hear its mournful cry echoing through the forest.`,
        `${pokemonId} gave you one last nuzzle before scampering off, as if it knew you would never meet again.`,
        `As ${pokemonId} wandered off into the wild, you couldn't help but feel a deep sadness in your heart, knowing that you may never see it again.`,
        `${pokemonId} hesitated for a moment before turning around and looking at you with a look of sorrow in its eyes. It then walked away, never looking back.`,
        `You could hear ${pokemonId}'s mournful cries as it disappeared into the distance. It was as if it knew that its fate had been sealed.`,
        `With a heavy heart, you watched as ${pokemonId} disappeared into the wild, knowing that it would have to fend for itself and face many dangers without your protection.`,
        `${pokemonId} looked at you with big, tearful eyes as you released it into the wild. You could tell that it didn't want to go, but it knew that it had to.`
      ];

      const randomIndex = Math.floor(Math.random() * alerts.length);
      const randomAlert = alerts[randomIndex];

      alert(randomAlert);
    }
  }
}
