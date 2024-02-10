import PokemonListSkeleton from "@/app/(pokemon)/_components/skeletons/pokemon-list-skeleton"
import PokemonTypesListSkeleton from "@/app/(pokemon)/_components/skeletons/pokemon-types-list-skeleton"
import PokeballIcon from "@/modules/ui/_icons/pokeball-icon"

const LayoutSkeleton = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-4 p-2 pb-10">
      {/* NAVBAR */}
      <nav className="flex w-fit items-center gap-5 p-4 text-white">
        <PokeballIcon />
        <h1 className="text-3xl font-bold">Pokédex</h1>
      </nav>
      {/* POKEMON TYPES LIST */}
      <PokemonTypesListSkeleton />
      <PokemonListSkeleton />
    </main>
  )
}
export default LayoutSkeleton
