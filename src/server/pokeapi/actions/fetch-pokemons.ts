"use server"

import Pokedex from "pokedex-promise-v2"
const P = new Pokedex()

export async function fetchPokemons() {
  const limit = 20
  return await P.getPokemonsList({ limit })
}
