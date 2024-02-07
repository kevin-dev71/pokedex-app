import removeEmptyOrNullValues from "@/lib/removeEmptyOrNullValues"

export const getBaseUrlWithQueryParams = (
  url: string,
  params: Record<string, string | string[] | number | undefined | "true" | "false" | null> = {}
): string => {
  const queryParams = Object.entries(removeEmptyOrNullValues(params))
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        const noNullArr = value.filter((el) => el)
        if (noNullArr.length === 0) return ""
        if (noNullArr.length > 0) return `${key}=${noNullArr.toString()}`
      }
      return `${key}=${value}`
    })
    .filter((el) => el !== "" && el !== null)
    .join("&")

  const queryString = queryParams ? `?${queryParams}` : ""
  return `${url}${queryString}`
}
