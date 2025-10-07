// export default function UseSearch(){
//     var timeout = setTimeout(() => {}, 2000);
//     clearTimeout(timeout);
    
//     timeout = setTimeout(function () {
//         clearTimeout(timeout);
//         const ddlContainer = document.querySelector("#ddlContainer");
//         ddlContainer.innerHTML = "";
//         let valorPesquisa = searchInput.value;

//         if(valorPesquisa.length < 3){
//             return;
//         }
//         fetch(API_URL + valorPesquisa, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "spring.web.cors.allowed-origin": "*",
//                 "spring.web.cors.allowed-methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH",
//                 "spring.web.cors.allowed-headers": "*"

//             }
//         })
//             .then(res => res.json())
//             .then((listaResultados) => {

//                 if(listaResultados.length == 0){
//                     let divItem = document.createElement("div");
//                     divItem.className = "ddlItem";
//                     divItem.innerText = "Sem resultado para essa busca";
//                     ddlContainer.appendChild(divItem);
//                 }

//                 listaResultados.forEach(item => {
//                     let divItem = document.createElement("div");
//                     divItem.className = "ddlItem";
//                     divItem.addEventListener("click", () => {
//                         var urlAtual = window.location.origin;
//                         window.location.href = `${urlAtual}/pesquisar.html?${item}`

//                     });
//                     divItem.innerText = item;
//                     ddlContainer.appendChild(divItem);
//                 });
//                 document.addEventListener("click", (e) => {
//                         if (e.target !== ddlContainer) {
//                             ddlContainer.innerHTML = "";
//                         }
//                     });
//             })
//     }, 1000)
// }