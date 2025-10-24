// Fiz essa função porque a Data tá vindo toda quebrada com milisegundos da API
// Daí eu formato aqui e retorno já a string bonitinha pra aparecer em tela
export function formatarData(data : Date, temHora = false) {
    if(data){
        var dtString = data.toString();
        dtString = dtString.replace(/(\.\d{3})\d+/, '$1'); // Regex do GPT pra tratar os milisegundos quebrados
        data = new Date(dtString);
        temHora ? dtString = data.toLocaleString() : dtString = data.toLocaleDateString();
        return dtString;
    }
}