import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import Searching from "../Searching/Searching"

const autoCompleteFake = [
  {
    callNumber: "123",
    title: "Erro com integração com a api do Banco Inter"
  },
  {
    callNumber: "124",
    title: "Melhoria nos relatórios de recebimento"
  },
  {
    callNumber: "125",
    title: "Lentidão no carregamento da tela de relatório de clientes Lentidão no carregamento daasdafasdfsdafdsfasdfsagdasd"
  },
  {
    callNumber: "125",
    title: "Lentidão no carregamento da tela de relatório de clientes Lentidão no carregamento daasdafasdfsdafdsfasdfsagdasd"
  },
  {
    callNumber: "125",
    title: "Lentidão no carregamento da tela de relatório de clientes Lentidão no carregamento daasdafasdfsdafdsfasdfsagdasd"
  },
  {
    callNumber: "125",
    title: "Lentidão no carregamento da tela de relatório de clientes Lentidão no carregamento daasdafasdfsdafdsfasdfsagdasd"
  },
]


export function AutoComplete() {
  const [search, setSearch] = useState<string>()
  const searchRef = useRef<HTMLDivElement>(null);

  function EraseSearch() {
    setSearch("");
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
  }, []);

  return (
    <div className="relative">
      <Input placeholder="Localize seu ticket" className="bg-white pr-8 w-full" value={search} onChange={(value) => setSearch(value.target.value)} />
      {
        search && <div ref={searchRef} className="absolute w-full overflow-y-scroll max-h-56 bg-white z-20">
          {
            autoCompleteFake.filter((f) => f.title.toUpperCase().includes(search.toUpperCase()) || f.callNumber.includes(search)).map((m) => {
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