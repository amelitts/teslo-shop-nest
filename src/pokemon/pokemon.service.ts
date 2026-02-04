import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonService {
  findAll() {
    return 'Servicio de Pokémon';
  }
}