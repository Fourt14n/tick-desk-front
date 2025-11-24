import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import Searching from "../Searching/Searching"
import { api } from "@/lib/axios"
import { showError } from "@/hooks/useToast"


type TicketResults = {
  numberCall: string,
  title: string,
  id: number
}

export function AutoComplete() {
  const [search, setSearch] = useState<string>()
  const searchRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<TicketResults[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>(setTimeout(() => {})); // Timeout da busca

  function EraseSearch() {
    setSearch("");
    setResults([]);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        EraseSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [search]);

  return (
    <div className="relative">
      <Input placeholder="Localize seu ticket" maxLength={255} className="bg-white pr-8 w-full" value={search} onChange={(value) => {
        setSearch(value.target.value)

        clearTimeout(timeoutRef.current);

        if (value.target.value) {
          timeoutRef.current = setTimeout(() => {
            api.get(`api/calls/search?query=${value.target.value}`)
              .then(res => setResults(res.data))
              .catch(erro => showError(erro.response.data.error))
          }, 1500)
        }

      }
      } />
      {
        search && <div ref={searchRef} className="absolute w-full overflow-y-scroll max-h-56 bg-white z-20">
          {
            results.filter((f) => f.title.toUpperCase().includes(search.toUpperCase()) || f.numberCall.includes(search)).map((m) => {
              return (
                <Searching ticket={m} eraserFunc={EraseSearch} />
              )
            })
          }
        </div>
      }
    </div>

  )



}