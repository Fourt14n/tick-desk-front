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

export function TrataDataBackEnd(data: Date | undefined){
    if(data){
        var dtString = data.toString();
        dtString = dtString.replace(/(\.\d{3})\d+/, '$1'); // Regex do GPT pra tratar os milisegundos quebrados
        data = new Date(dtString);
        return data;
    }
}

export function capitalizeFirstWord(str: string): string {
  if (!str) {
    return str;
  }
  const words = str.split(' ');
  if (words.length === 0) {
    return str;
  }
  const firstWord = words[0];
  const capitalizedFirstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  words[0] = capitalizedFirstWord; 
  return words.join(' ');
}
