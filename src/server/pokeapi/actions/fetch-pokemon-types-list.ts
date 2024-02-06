"use server"

import Pokedex from "pokedex-promise-v2"
const P = new Pokedex()

export async function fetchPokemonTypesList() {
  return await P.getTypesList()
}
