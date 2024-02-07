export default function removeEmptyOrNullValues<T extends object>(obj: T): Partial<T> | T {
  const newObj: Partial<T> = {}

  for (const key in obj) {
    const value = obj[key]

    if (value !== null && value !== undefined && value !== "") {
      newObj[key] = value
    }
  }

  return newObj
}
