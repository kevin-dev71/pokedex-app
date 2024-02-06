"use client"

import { useSearchParams } from "next/navigation"
import type PokeAPI from "pokedex-promise-v2"

import PokemonTypesListItem from "@/app/(pokemon)/_components/pokemon-types-list-item"
import { navigate } from "@/server/pokeapi/actions/navigate"

const PokemonTypesList = ({ pokemonTypes }: { pokemonTypes: PokeAPI.NamedAPIResource[] }) => {
  // SEARCH PARAMS
  const searchParams = useSearchParams()
  const name = searchParams.get("name")
  const url = searchParams.get("url")
  const page = searchParams.get("page") ?? 1
  const selectedFilter = searchParams.get("filter") ?? ""

  // HANDLERS
  const handleFilters = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isTypePage = url && name
    const navigateUrl = isTypePage
      ? `/type?url=${url}&name=${name}&filter=${e.target.value}&page=${page}`
      : `/?page=${page}&filter=${e.target.value}`
    navigate(navigateUrl)
  }

  return (
    <section className="flex items-center gap-2">
      <section className="flex flex-col gap-3 text-white">
        <h2 className="text-lg font-semibold">
          Filter by type: <span className="capitalize">{name}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {pokemonTypes.map((pokemonType) => {
            const { url: _url, name: _name } = pokemonType
            return (
              <PokemonTypesListItem key={_url} pokemonTypes={pokemonType} active={_name === name} />
            )
          })}
        </div>
      </section>

      {/* FILTERS */}
      <select
        className="self-start text-grayscale-dark"
        name="filters"
        value={selectedFilter}
        onChange={handleFilters}
      >
        <option value="undefined">Select a filter</option>
        <option value="base_exp_asc">Base Experience ASC</option>
        <option value="base_exp_desc">Base Experience DESC</option>
      </select>
    </section>
  )
}

export default PokemonTypesList
