import { Suspense } from "react"
import Image from "next/image"
import type PokeAPI from "pokedex-promise-v2"

import Loading from "@/app/(ui)/_components/loading"
import { fetchResource } from "@/server/pokeapi/actions/fetch-resource"

interface PokemonListItemProps extends React.ComponentPropsWithoutRef<"article"> {
  pokemon: PokeAPI.NamedAPIResource
}

const PokemonListItem = async ({ pokemon, ...delegatedProps }: PokemonListItemProps) => {
  const { name, url } = pokemon

  // SERVICES
  const pokemonData = await fetchResource<PokeAPI.Pokemon>(url)

  // UI ADAPT
  const { sprites, id } = pokemonData
  const {
    other: { dream_world },
    front_default,
  } = sprites

  return (
    <Suspense fallback={<LoadingListItem name={name} />}>
      <article
        className="relative row-span-4 mx-2 grid grid-rows-subgrid rounded-xl bg-white px-2 pb-3 pt-3 shadow-xl"
        {...delegatedProps}
      >
        <div
          role="presentation"
          className="absolute bottom-0 left-0 z-0 h-2/5 w-full rounded-2xl bg-grayscale-background"
        />
        <span className="z-10 ml-auto text-grayscale-medium">#{id}</span>
        <div className="relative z-10 flex aspect-square w-full">
          <Image
            fill
            src={dream_world.front_default ?? front_default ?? "/assets/img/no-image.svg"}
            alt={name}
          />
        </div>
        <span className="z-10 text-center font-semibold capitalize text-grayscale-dark">
          {name}
        </span>
      </article>
    </Suspense>
  )
}
export default PokemonListItem

const LoadingListItem = ({ name }: { name: string }) => {
  return (
    <article className="flex flex-col gap-3 rounded-xl bg-white p-4">
      <Loading />
      <span className="text-grayscale-dark">{name}</span>
    </article>
  )
}
