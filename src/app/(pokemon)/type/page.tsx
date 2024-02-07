import { Suspense } from "react"
import type PokeAPI from "pokedex-promise-v2"

import PokemonListEmpty from "@/app/(pokemon)/_components/empty-states/pokemon-list-empty"
import PokemonListItem from "@/app/(pokemon)/_components/pokemon-list-item"
import PokemonListSkeleton from "@/app/(pokemon)/_components/skeletons/pokemon-list-skeleton"
import { fetchResource } from "@/server/pokeapi/actions/fetch-resource"

const PokemonTypePage = async ({
  params: _,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const url = searchParams.url

  if (!url) throw new Error("no url")

  // SERVICES
  const result = await fetchResource<PokeAPI.Type>(url)

  // SERVICE
  const pokemonsWithDataArr: PokeAPI.Pokemon[] = []

  // const pokemonDataArr = await fetchResource<PokeAPI.Pokemon[]>(results.map((result) => result.url)) // Too slow
  // FETCH POKEMON DETAILS in Parallel
  await Promise.allSettled(
    result.pokemon.map((_result) => {
      return fetchResource<PokeAPI.Pokemon>(_result.pokemon.url)
    })
  ).then((promiseResults) => {
    promiseResults.forEach((promiseResult) => {
      if (promiseResult.status === "fulfilled") pokemonsWithDataArr.push(promiseResult.value)
    })
  })

  // APPLY FILTERS
  let filteredPokemonsWithDataArr
  const filtersArr = searchParams.filter
    ? String(searchParams.filter)
        .split(",")
        .filter((el) => el !== "")
    : []

  const filteredArr = pokemonsWithDataArr.filter((pokemon) => {
    const { types } = pokemon
    const pokemonTypesName = types.map((type) => type.type.name)
    return filtersArr.every((element) => pokemonTypesName.includes(element))
  })
  // APPLY SORT
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

  return (
    <Suspense key={String(url)} fallback={<PokemonListSkeleton />}>
      <section className="mx-auto grid w-full grid-flow-dense grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 rounded-xl bg-white px-2 pb-3 pt-3">
        {/* EMPTY STATE */}
        {filteredPokemonsWithDataArr.length === 0 && <PokemonListEmpty />}
        {/* LIST ALL */}
        {filteredPokemonsWithDataArr.map((pokemon) => {
          const { url: _url } = pokemon
          return <PokemonListItem key={_url} pokemon={pokemon} sortBy={String(sortBy)} />
        })}
      </section>
    </Suspense>
  )
}
export default PokemonTypePage
