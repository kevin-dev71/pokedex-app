import PokemonListItem from "@/app/(pokemon)/_components/pokemon-list-item"
import PokeballIcon from "@/app/(ui)/_icons/pokeball-icon"
import { fetchPokemons } from "@/server/pokeapi/actions/fetch-pokemons"

export default async function Home() {
  // SERVICES
  const pokemonsFetchResult = await fetchPokemons()

  // UI ADAPT
  const { results } = pokemonsFetchResult
  const pokemonList = results.map((pokemon) => {
    const { url } = pokemon

    return <PokemonListItem key={url} pokemon={pokemon} />
  })

  // RENDER
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col p-2">
      {/* NAVBAR */}
      <nav className="flex items-center gap-5 p-4 text-white">
        <PokeballIcon />
        <h1 className="text-3xl font-bold">Pokédex</h1>
      </nav>

      {/* POKEMONLIST */}
      <section className="mx-auto grid w-full grid-flow-dense grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 rounded-xl bg-white px-2 pb-3 pt-3">
        {pokemonList}
      </section>
    </main>
  )
}
