import { Suspense } from "react"
import type PokeAPI from "pokedex-promise-v2"

import PokemonListEmpty from "@/modules/pokemon/_components/empty-states/pokemon-list-empty"
import PokemonListItem from "@/modules/pokemon/_components/pokemon-list-item"
import PokemonListSkeleton from "@/modules/pokemon/_components/skeletons/pokemon-list-skeleton"
import { filterAndSortPokemons } from "@/modules/pokemon/utils/filter-and-sort-pokemons"
import Pagination from "@/modules/ui/_components/pagination"
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

  const pokemonsWithDataArr = await Promise.all(
    results.map((result) => fetchResource<PokeAPI.Pokemon>(result.url))
  )

  // APPLY FILTERS
  const filteredPokemonsWithDataArr = filterAndSortPokemons({
    pokemons: pokemonsWithDataArr,
    searchParams,
  })
  const sortBy = searchParams.sortBy ?? ""

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
      <Suspense fallback={<PokemonListSkeleton />}>
        <section className="mx-auto grid w-full grid-flow-dense grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 rounded-xl bg-white px-2 pb-3 pt-3">
          {/* EMPTY STATE */}
          {filteredPokemonsWithDataArr.length === 0 && <PokemonListEmpty />}
          {/* LIST ITEMS RESULT */}
          {filteredPokemonsWithDataArr.map((pokemon) => {
            return <PokemonListItem key={pokemon.id} pokemon={pokemon} sortBy={String(sortBy)} />
          })}
        </section>
      </Suspense>
    </>
  )
}
