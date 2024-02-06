import Link from "next/link"
import type PokeAPI from "pokedex-promise-v2"

import { cn } from "@/lib/cn"

interface PokemonTypesListItemProps extends React.ComponentPropsWithoutRef<"article"> {
  pokemonTypes: PokeAPI.NamedAPIResource
  active?: boolean
}

const PokemonTypesListItem = ({ pokemonTypes, active = false }: PokemonTypesListItemProps) => {
  const { name, url } = pokemonTypes

  return (
    <Link
      href={{
        pathname: "/type",
        query: { url, name },
      }}
      className={cn(
        "rounded-lg  px-3 py-2 font-medium text-black",
        active ? "bg-pokemon-type-bug" : "bg-grayscale-background"
      )}
    >
      {name}
    </Link>
  )
}
export default PokemonTypesListItem
