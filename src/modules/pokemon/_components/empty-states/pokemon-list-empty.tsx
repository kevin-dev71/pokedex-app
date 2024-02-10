import Link from "next/link"

const PokemonListEmpty = () => {
  return (
    <div className="container mx-auto flex flex-wrap items-center justify-between rounded-md bg-white ">
      <div className="w-full rounded-md border-2 border-dashed border-slate-200 p-20 text-center ">
        <i className="mb-5" />
        <p className="mb-2 text-xl font-bold uppercase">Oops</p>
        <span className="mb-10 block text-slate-400 ">There is no pokemon of this type</span>
        <Link
          href={"/"}
          className="w-52 rounded-full bg-pokemon-type-electric px-5 py-3 font-semibold text-grayscale-medium"
        >
          View all pokemons
        </Link>
      </div>
    </div>
  )
}
export default PokemonListEmpty
