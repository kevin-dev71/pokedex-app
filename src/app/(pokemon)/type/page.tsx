import { Suspense } from "react"
import type PokeAPI from "pokedex-promise-v2"

import PokemonListEmpty from "@/modules/pokemon/_components/empty-states/pokemon-list-empty"
import PokemonListItem from "@/modules/pokemon/_components/pokemon-list-item"
import PokemonListSkeleton from "@/modules/pokemon/_components/skeletons/pokemon-list-skeleton"
import { filterAndSortPokemons } from "@/modules/pokemon/utils/filter-and-sort-pokemons"
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
  const filteredPokemonsWithDataArr = filterAndSortPokemons({
    pokemons: pokemonsWithDataArr,
    searchParams,
  })

  const sortBy = searchParams.sortBy ?? ""

  return (
    <Suspense fallback={<PokemonListSkeleton />}>
      <section className="mx-auto grid w-full grid-flow-dense grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 rounded-xl bg-white px-2 pb-3 pt-3">
        {/* EMPTY STATE */}
        {filteredPokemonsWithDataArr.length === 0 && <PokemonListEmpty />}
        {/* LIST ALL */}
        {filteredPokemonsWithDataArr.map((pokemon) => {
          return <PokemonListItem key={pokemon.id} pokemon={pokemon} sortBy={String(sortBy)} />
        })}
      </section>
    </Suspense>
  )
}
export default PokemonTypePage
