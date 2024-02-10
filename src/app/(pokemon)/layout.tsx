import { Suspense } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"

import { cn } from "@/lib/cn"
import PokemonTypesList from "@/modules/pokemon/_components/pokemon-types-list"
import LayoutSkeleton from "@/modules/pokemon/_components/skeletons/layout-skeleton"
import PokemonTypesListSkeleton from "@/modules/pokemon/_components/skeletons/pokemon-types-list-skeleton"
import PokeballIcon from "@/modules/ui/_icons/pokeball-icon"
import { fetchPokemonTypesList } from "@/server/pokeapi/actions/fetch-pokemon-types-list"

import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nextjs 14 - PokeApi",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // SERVICES
  const pokemonsTypesListResult = await fetchPokemonTypesList()
  const { results: pokemonsTypes } = pokemonsTypesListResult

  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-identity-primary")}>
        <Suspense fallback={<LayoutSkeleton />}>
          <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-4 p-2 pb-10">
            {/* NAVBAR */}
            <nav>
              <Link href="/" className="flex w-fit items-center gap-5 p-4 text-white">
                <PokeballIcon />
                <h1 className="text-3xl font-bold">Pokédex</h1>
              </Link>
            </nav>
            {/* POKEMON TYPES LIST */}
            <Suspense fallback={<PokemonTypesListSkeleton />}>
              <PokemonTypesList pokemonTypes={pokemonsTypes} />
            </Suspense>
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  )
}
