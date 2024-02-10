const PokemonTypesListSkeleton = () => {
  return (
    <div role="status" className="max-w-lg animate-pulse space-y-2.5">
      <div className="flex w-full items-center">
        <div className="h-2.5 w-32 rounded-full bg-gray-200" />
        <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300" />
        <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300" />
      </div>
      <div className="flex w-full max-w-[480px] items-center">
        <div className="h-2.5 w-full rounded-full bg-gray-200" />
        <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300" />
        <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default PokemonTypesListSkeleton
