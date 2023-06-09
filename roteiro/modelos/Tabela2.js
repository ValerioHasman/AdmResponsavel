export class Tabela2 {
  #tabela = Object();
  #txtjson = Object();
  #dados = {pessoas: Array(0)};

  constructor(tabela, txtjson, dados = this.dados){
    this.tabela = tabela;
    this.txtjson = txtjson;
    this.dados = dados;
  }

  set tabela(valor){
    if (valor.tagName == 'TABLE'){
      this.#tabela = Object(valor);
    } else {
      console.error('Tipo esperado TABLE!');
    }
  }
  set txtjson(valor){
    if (valor.tagName == 'TEXTAREA'){
      this.#txtjson = Object(valor);
    } else {
      console.error('Tipo esperado TEXTAREA!');
    }
  }
  set dados(valor){
    console.log(valor)
    this.#dados = Object(valor);
  }

  get tabela(){
    return Object(this.#tabela);
  }
  get txtjson(){
    return Object(this.#txtjson);
  }
  get dados(){
    return Object(this.#dados);
  }

  

  carregarTooltips(parteDoDocumento){
    const tooltipTriggerList = parteDoDocumento.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    tooltipList.forEach((dica)=>{
      dica._element.addEventListener('click',()=>{dica.hide()});
    });
  }
  
}