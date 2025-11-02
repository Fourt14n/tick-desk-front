export const phoneMask = (value: string) => {
    if(value){
        return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})/, '$1-$2');
        
    }else
        return value
}