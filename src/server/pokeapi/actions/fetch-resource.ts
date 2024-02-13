"use server"

import Pokedex from "pokedex-promise-v2"
const P = new Pokedex()

export async function fetchResource<T>(params: string | string[]) {
  const results = await P.resource(params)
  return results as T
}
