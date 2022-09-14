
function main(){
  
  const coinsSelect = document.querySelector("#coins_select");
  const btnConvert = document.querySelector("#btn_convert");
  const inputValue = document.querySelector("#input_value");
  const divResult = document.querySelector(".result");
  const spanIcons = document.querySelector("#icons");

  const configs = {
    method: 'GET',
    headers: { 'Content-Type': 'application'}
  };
  const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL";
  
  function iconsAdd(){
    fetch( url, configs)
    .then( res => res.json())
    .then( res => {
      const resObj = Object.values(res);

      const iconsCreate = resObj.filter( (el)  => buscarValores(el.name, el.ask));
      iconsCreate.map(el => {
        spanIcons.innerHTML = 
        `
        <img src="src/imagens/${el.code}.png" />
        <img src="src/imagens/${el.codein}.png" />
        `
      })
    })
    .catch( e => console.log("ERROR "+ e));
  }

  function checkCoin(){
    const selectOption = coinsSelect.options[coinsSelect.selectedIndex].value;
    return selectOption;
  }

  function buscarValores(name, ask){
    if (name === checkCoin()){
      return ask;
    }
  }
  
  function createOption( url, configs ) {
    fetch( url, configs)
      .then( res => res.json() )
      .then( res => {
        resObj = Object.values(res);
        resObj.map( el  => {
          coinsSelect.innerHTML += `
          <option value='${el.name}'>
            <img src='../imagens/${el.code}'>
            ${el.code}
             para 
             ${el.codein}
          </option>`;
        });
      })
      .catch( e => console.log("ERROR "+ e))
  }

  function convertCoin(url, configs){
    fetch( url, configs)
      .then( res => res.json())
      .then( res => {
        const resObj = Object.values(res);
  
        const valueOption = resObj.filter( (el)  => buscarValores(el.name, el.ask));
        const valueFloat = parseFloat(valueOption.map(el => (el.ask)));
        divResult.innerHTML = (!inputValue.value || !coinsSelect.value) 
        ?
        `
          <span class="value_converted">ERROR </span>
          <h3>Insira as informações corretamente</h3>
        ` 
        :
           `
           <h3 class="value_converted">
            R$ ${(valueFloat * inputValue.value).toFixed(2)}
          </h3>
          `;  
        
      })
      .catch( e => console.log("ERROR "+ e));
  }
    

  createOption(url, configs);

  coinsSelect.addEventListener("input", iconsAdd);  


  btnConvert.addEventListener("click", ()=>{
    convertCoin(url, configs)
  });
}

main();