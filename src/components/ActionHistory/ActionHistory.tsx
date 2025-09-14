import History from "../History/History";
import { Separator } from "../ui/separator";

export default function ActionHistory() {
    // Pra fins educativos vou criar um array de objetos pra gente testar já dinamicamente
    const acoesChamado = [
        {nomeUsuario: "Gabriel Constantin", descricao: "Foi criada uma tela de edição de tickets para o sistema, verificar o Figma do projeto para a revisão e análise", isPublic: true, dtHrCadastro: "17/08/2025 11:55"},
        {nomeUsuario: "Hebert Lopes", descricao: "Prototipar uma tela de edição e criação de tickets no Figma.", isPublic: false, dtHrCadastro: "11/08/2025 19:35"},
    ]

    return (
        <div className="pt-4 h-full">
            <div className="flex flex-col justify-center row-span-1">
                <p className="text-(--text-strongGreen) font-bold">Histórico de ações</p>
                <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
            </div>

            <div className="flex flex-col gap-4 pt-4">
                {acoesChamado.map(item => <History acao={item} />)}
            </div>
        </div>
    )
}