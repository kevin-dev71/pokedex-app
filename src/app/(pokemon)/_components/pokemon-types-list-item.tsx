import Link from "next/link"
import { useSearchParams } from "next/navigation"
import type PokeAPI from "pokedex-promise-v2"

import { cn } from "@/lib/cn"
import { getBaseUrlWithQueryParams } from "@/lib/getBaseUrlWithQueryParams"

interface PokemonTypesListItemProps extends React.ComponentPropsWithoutRef<"article"> {
  pokemonTypes: PokeAPI.NamedAPIResource
}

const PokemonTypesListItem = ({ pokemonTypes }: PokemonTypesListItemProps) => {
  // UI ADAPT
  const searchParams = useSearchParams()
  const name = searchParams.get("name")
  const url = searchParams.get("url")
  const page = searchParams.get("page") ?? 1
  const selectedSortBy = searchParams.get("sortBy") ?? ""
  const selectedFilter = searchParams.get("filter") ?? ""

  const { name: pokemonTypeName } = pokemonTypes
  const filtersArr = selectedFilter.split(",")
  const active = filtersArr.includes(pokemonTypeName)
  const isTypePage = url && name
  const navigateBaseUrl = isTypePage ? "/type" : "/"

  const navigationUrl = getBaseUrlWithQueryParams(navigateBaseUrl, {
    url,
    name,
    sortBy: selectedSortBy,
    page,
    filter: active
      ? filtersArr.filter((item) => item !== pokemonTypeName).join(",")
      : (filtersArr.push(pokemonTypeName), filtersArr.join(",")),
  })

  return (
    <Link
      href={navigationUrl}
      className={cn(
        "rounded-lg  px-3 py-2 font-medium text-black",
        active ? "bg-pokemon-type-bug" : "bg-grayscale-background"
      )}
    >
      {pokemonTypeName}
    </Link>
  )
}
export default PokemonTypesListItem
