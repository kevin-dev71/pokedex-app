"use client"

import { type ChangeEvent } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/cn"

type PaginationProps = {
  options: {
    total: number
    viewingFromPage: number
    viewingToPage: number
    pagesCount: number
    currentPage: number
  }
}

const Pagination = ({ options }: PaginationProps) => {
  // Set params
  const { total, viewingFromPage, viewingToPage, pagesCount, currentPage } = options

  // router
  const router = useRouter()

  // HANDLERS
  const handlePagination = async (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/?page=${e.target.value}`)
  }

  const handleNextPage = async () => {
    router.push(`/?page=${currentPage + 1}`)
  }

  const handlePreviousPage = async () => {
    router.push(`/?page=${currentPage - 1}`)
  }
  // calculate options for page select
  const pagesOptions = Array.from({ length: pagesCount }, (_, index) => {
    const value = index + 1
    return (
      <option key={value} value={value}>
        {value}
      </option>
    )
  })

  return (
    <nav className="flex w-full items-center justify-center gap-2 font-semibold text-white">
      <span>Rows per page</span>
      <select name="" className="text-grayscale-dark">
        <option value={20}>20</option>
      </select>
      <span>
        <span className="font-bold">{viewingFromPage}</span> -{" "}
        <span className="font-bold">{viewingToPage}</span> de{" "}
        <span className="font-bold">{total}</span>
      </span>
      <button
        className={cn("font-bold", {
          "text-grayscale-medium cursor-not-allowed": currentPage === 1,
        })}
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
      >
        {"<"}
      </button>
      <select
        name="paginate"
        value={currentPage}
        className="text-grayscale-dark"
        onChange={handlePagination}
      >
        {pagesOptions}
      </select>
      <button
        className={cn("font-bold", {
          "text-grayscale-medium cursor-not-allowed": currentPage === pagesCount,
        })}
        disabled={currentPage === pagesCount}
        onClick={handleNextPage}
      >
        {">"}
      </button>
    </nav>
  )
}

export default Pagination
