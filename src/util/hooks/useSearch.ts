import { useTransition, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useSearch = (searchQuery: string | undefined) => {
  const router = useRouter();
  const path = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(searchQuery || "");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue(searchQuery || "");
  }, [searchQuery]);

  function handleSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function clearSearchValue() {
    setSearchValue("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function toggleFocus() {
    setIsFocused(!isFocused);
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
  };
};
