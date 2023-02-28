import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const {apiKey, apiTrainers} = environment;

@Injectable({
  providedIn: 'root'
})
export class CaughtService {

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
  ) { }

  public addToCaughtPokemon(pokemonId: string): Observable<Trainer> {
    if(!this.trainerService.trainer){
      throw new Error("No trainer")
    }

    const trainer: Trainer = this.trainerService.trainer;
    
    const pokemon: Pokemon | undefined = this.pokemonService.pokemonById(pokemonId);

    if(!pokemon) {
      throw new Error("No pokemon with id: " + pokemonId);
    }

    if(this.trainerService.inCaught(pokemonId)){
      throw new Error("Pokemon already caught: " + pokemonId);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey
    })

    this._loading = true;

    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon, pokemon]
    }, {
      headers
    })
    .pipe(
      tap((updatedTrainer: Trainer) => {
        this.trainerService.trainer = updatedTrainer;
      }), 
      finalize(() => {
        this._loading = false;
      })
    )
  }

}
