import PokemonListItem from "@/app/(pokemon)/_components/pokemon-list-item"
import Pagination from "@/app/(ui)/_components/pagination"
import PokeballIcon from "@/app/(ui)/_icons/pokeball-icon"
import { fetchPokemons } from "@/server/pokeapi/actions/fetch-pokemons"

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

  // to calculate values for this part 1 - 10 de 15
  const viewingFromPage = (currentPage - 1) * limit + 1
  const viewingEndPage = viewingFromPage + limit - 1
  const viewingToPage = viewingEndPage > count ? count : viewingEndPage
  const pagesCount = Math.ceil(count / limit)

  // RENDER
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-4 p-2 pb-10">
      {/* NAVBAR */}
      <nav className="flex items-center gap-5 p-4 text-white">
        <PokeballIcon />
        <h1 className="text-3xl font-bold">Pokédex</h1>
      </nav>

      {/* POKEMONLIST */}
      <section className="mx-auto grid w-full grid-flow-dense grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 rounded-xl bg-white px-2 pb-3 pt-3">
        {results.map((pokemon) => {
          const { url } = pokemon
          return <PokemonListItem key={url} pokemon={pokemon} />
        })}
      </section>

      {/* PAGINATION */}
      <Pagination
        options={{ total: count, viewingFromPage, viewingToPage, pagesCount, currentPage }}
      />
    </main>
  )
}
