import type { Route } from "next"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState, useTransition } from "react"

export const useSearch = (searchQuery: string | undefined) => {
  const router = useRouter()
  const path = usePathname() as Route
  const [isPending, startTransition] = useTransition()
  const [searchValue, setSearchValue] = useState(searchQuery || "")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSearchValue(searchQuery || "")
  }, [searchQuery])

  function handleSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  function clearSearchValue() {
    setSearchValue("")

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  function toggleFocus() {
    setIsFocused(!isFocused)
  }

  return {
    router,
    path,
    isPending,
    searchValue,
    isFocused,
    inputRef,
    startTransition,
    handleSearchValue,
    clearSearchValue,
    toggleFocus,
  }
}
