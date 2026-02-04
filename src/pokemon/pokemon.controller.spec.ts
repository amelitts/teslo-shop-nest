import { Controller, Get } from '@nestjs/common';

@Controller('pokemon')
export class PokemonController {

  @Get()
  findAll() {
    return 'Listado de Pokémon';
  }
}

