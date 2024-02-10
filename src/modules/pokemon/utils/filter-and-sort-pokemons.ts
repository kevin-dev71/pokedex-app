import type PokeAPI from "pokedex-promise-v2"

export function filterAndSortPokemons({
  pokemons,
  searchParams,
}: {
  pokemons: PokeAPI.Pokemon[]
  searchParams: { [key: string]: string | string[] | undefined }
}): PokeAPI.Pokemon[] {
  let filteredPokemonsWithDataArr
  const filtersArr = searchParams.filter
    ? String(searchParams.filter)
        .split(",")
        .filter((el) => el !== "")
    : []

  const filteredArr = pokemons.filter((pokemon) => {
    const { types } = pokemon
    const pokemonTypesName = types.map((type) => type.type.name)
    return filtersArr.every((element) => pokemonTypesName.includes(element))
  })
  // APPLY SORT BY
  const sortBy = searchParams.sortBy ?? ""
  switch (sortBy) {
    case "base_exp_asc":
      filteredPokemonsWithDataArr = [...filteredArr].sort(
        (a, b) => (a.base_experience ?? 0) - (b.base_experience ?? 0)
      )
      break
    case "base_exp_desc":
      filteredPokemonsWithDataArr = [...filteredArr].sort(
        (a, b) => (b.base_experience ?? 0) - (a.base_experience ?? 0)
      )
      break
    case "weight_asc":
      filteredPokemonsWithDataArr = [...filteredArr].sort(
        (a, b) => (a.weight ?? 0) - (b.weight ?? 0)
      )
      break
    case "weight_desc":
      filteredPokemonsWithDataArr = [...filteredArr].sort(
        (a, b) => (b.weight ?? 0) - (a.weight ?? 0)
      )
      break
    default:
      filteredPokemonsWithDataArr = filteredArr
  }

  return filteredPokemonsWithDataArr
}
