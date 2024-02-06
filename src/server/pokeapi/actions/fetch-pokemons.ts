"use server"

import { redirect } from "next/navigation"
import Pokedex from "pokedex-promise-v2"
const P = new Pokedex()

export async function fetchPokemons({ limit = 20, offset = 0 } = {}) {
  const result = await P.getPokemonsList({ limit, offset })
  // Return Page 1 results REFACTOR: more legible
  if (!result.results || !result.results?.length) {
    redirect("/?page=1")
  }
  return result
}
