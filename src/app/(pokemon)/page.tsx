import { Suspense } from "react"
import type PokeAPI from "pokedex-promise-v2"

import PokemonListEmpty from "@/app/(pokemon)/_components/empty-states/pokemon-list-empty"
import PokemonListItem from "@/app/(pokemon)/_components/pokemon-list-item"
import PokemonListSkeleton from "@/app/(pokemon)/_components/skeletons/pokemon-list-skeleton"
import Pagination from "@/app/(ui)/_components/pagination"
import { fetchPokemons } from "@/server/pokeapi/actions/fetch-pokemons"
import { fetchResource } from "@/server/pokeapi/actions/fetch-resource"

export default async function Home({
  params: _,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Calculate pagination from url params
  const limit = 20
  const currentPageParam = searchParams.page ? Number(searchParams.page) : 1
  const currentPage = currentPageParam <= 1 ? 1 : currentPageParam
  const offset = (currentPage - 1) * limit

  // SERVICES
  const pokemonsFetchResult = await fetchPokemons({ offset })

  // UI ADAPT
  const { results, count } = pokemonsFetchResult
  const pokemonsWithDataArr: PokeAPI.Pokemon[] = []

  // SERVICE
  // const pokemonDataArr = await fetchResource<PokeAPI.Pokemon[]>(results.map((result) => result.url)) // Too slow
  // FETCH POKEMON DETAILS in Parallel
  await Promise.allSettled(
    results.map((result) => fetchResource<PokeAPI.Pokemon>(result.url))
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

  // to calculate values for this part 1 - 10 de 15
  const viewingFromPage = (currentPage - 1) * limit + 1
  const viewingEndPage = viewingFromPage + limit - 1
  const viewingToPage = viewingEndPage > count ? count : viewingEndPage
  const pagesCount = Math.ceil(count / limit)

  // RENDER
  return (
    <>
      {/* PAGINATION */}
      <Pagination
        options={{ total: count, viewingFromPage, viewingToPage, pagesCount, currentPage }}
      />

      {/* POKEMONLIST */}
      <Suspense key={currentPage} fallback={<PokemonListSkeleton />}>
        <section className="mx-auto grid w-full grid-flow-dense grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 rounded-xl bg-white px-2 pb-3 pt-3">
          {/* EMPTY STATE */}
          {filteredPokemonsWithDataArr.length === 0 && <PokemonListEmpty />}
          {/* LIST ITEMS RESULT */}
          {filteredPokemonsWithDataArr.map((pokemon) => {
            const { url } = pokemon
            return <PokemonListItem key={url} pokemon={pokemon} sortBy={String(sortBy)} />
          })}
        </section>
      </Suspense>
    </>
  )
}
