import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { PokeData, Pokemon } from '../models/pokemon.model';

const { apiPokemons } = environment; 

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemons(): void {

    if(this._pokemons.length > 0 || this.loading) {
      return;
    }

    this._loading = true;
    this.http.get<PokeData>(apiPokemons)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemonData: PokeData) => {
          this._pokemons = pokemonData.results;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public pokemonById(id: string): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.name == id);
  }

}
