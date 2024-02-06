import type PokeAPI from "pokedex-promise-v2"

import PokemonListItem from "@/app/(pokemon)/_components/pokemon-list-item"
import { fetchResource } from "@/server/pokeapi/actions/fetch-resource"

const PokemonTypePage = async ({
  params: _,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const url = searchParams.url
  const name = searchParams.name

  if (!url) throw new Error("no url")
  if (!name) throw new Error("no name")

  const result = await fetchResource<PokeAPI.Type>(url)

  return (
    <>
      <section className="mx-auto grid w-full grid-flow-dense grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 rounded-xl bg-white px-2 pb-3 pt-3">
        {result.pokemon.map((pokemon) => {
          const { url: _url } = pokemon.pokemon
          return <PokemonListItem key={_url} pokemon={pokemon.pokemon} />
        })}
      </section>
    </>
  )
}
export default PokemonTypePage
