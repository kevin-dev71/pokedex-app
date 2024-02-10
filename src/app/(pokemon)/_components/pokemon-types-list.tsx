"use client"

import { useRouter, useSearchParams } from "next/navigation"
import type PokeAPI from "pokedex-promise-v2"

import PokemonTypesListItem from "@/app/(pokemon)/_components/pokemon-types-list-item"
import { getBaseUrlWithQueryParams } from "@/lib/getBaseUrlWithQueryParams"
import Dropdown from "@/modules/ui/_components/dropdown"

type ListByTypeOptionType = { label: string; value: string | undefined }

const PokemonTypesList = ({ pokemonTypes }: { pokemonTypes: PokeAPI.NamedAPIResource[] }) => {
  // SEARCH PARAMS
  const searchParams = useSearchParams()
  const name = searchParams.get("name")
  const url = searchParams.get("url")
  const page = searchParams.get("page") ?? 1
  const selectedSortBy = searchParams.get("sortBy") ?? ""
  const selectedFilter = searchParams.get("filter") ?? ""
  const router = useRouter()

  // HANDLERS
  const handleListByType = ({ value, label }: ListByTypeOptionType) => {
    const selectValue = value === "undefined" ? undefined : value
    const selectedName = value ? label : undefined
    const navigateBaseUrl = selectValue ? "/type" : "/"
    const navigateUrl = getBaseUrlWithQueryParams(navigateBaseUrl, {
      url: selectValue,
      name: selectedName,
      sortBy: selectedSortBy,
      page,
      filter: selectValue ? undefined : selectedFilter,
      // filter: selectedFilter,
    })

    router.push(navigateUrl)
  }

  const handleSortBy = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    // CODE SMELL, PokemonTypesList component should not have responsability of building routes urls
    // determine if PokemonTypesList is in "/" or "/types"
    const isTypePage = url && name
    const sortBy = e.target.value === "undefined" ? undefined : e.target.value
    const navigateBaseUrl = isTypePage ? "/type" : "/"
    const navigateUrl = getBaseUrlWithQueryParams(navigateBaseUrl, {
      url,
      name,
      sortBy,
      page,
      filter: selectedFilter,
    })

    router.push(navigateUrl)
  }

  // UI ADAPT
  const pokemonTypesOptions = [
    { label: "List all by type", value: undefined },
    ...pokemonTypes.map((pokemonType) => {
      const { url: _url, name: _name } = pokemonType

      return { label: _name, value: _url }
    }),
  ]

  const selectedPokemonTypesOptions =
    pokemonTypesOptions.find((item: ListByTypeOptionType) => item.value === url) ??
    pokemonTypesOptions[0]

  return (
    <section className="flex items-center justify-between gap-2">
      <section className="flex flex-col gap-3 text-white">
        <h2 className="text-lg font-semibold">
          Filter by type: <span className="capitalize">{name}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {pokemonTypes.map((pokemonType) => {
            const { url: _url, name: _name } = pokemonType
            return <PokemonTypesListItem key={_name + _url} pokemonTypes={pokemonType} />
          })}
        </div>
      </section>

      {/* CODESMELL Labels for Selects */}
      {/* Options MENU */}
      <div className="z-20 flex flex-col gap-5 self-start text-grayscale-dark">
        {/* LIST TYPES */}
        <Dropdown
          inputId="pokemon-types"
          name="pokemon-types"
          defaultValue={pokemonTypesOptions[0]}
          value={selectedPokemonTypesOptions}
          onChange={(value) => handleListByType(value as ListByTypeOptionType)}
          options={pokemonTypesOptions}
        />

        {/* SORTBY */}
        <select
          className="self-start text-grayscale-dark"
          name="sortby"
          value={selectedSortBy}
          onChange={handleSortBy}
        >
          {/* CODE SMELL, use constants */}
          <option value={"undefined"}>Select a sort</option>
          <option value="base_exp_asc">Base Experience ASC</option>
          <option value="base_exp_desc">Base Experience DESC</option>
          <option value="weight_asc">Weight ASC</option>
          <option value="weight_desc">Weight DESC</option>
        </select>
      </div>
    </section>
  )
}

export default PokemonTypesList
