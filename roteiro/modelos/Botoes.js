export default class Botoes {
  #texto = String();
  #botao = Object();
  #desabilitado = Boolean();

  constructor(botao){
    this.botao = botao;
    this.texto = this.botao.innerHTML;
  }

  set botao (valor){
    if (valor.tagName == 'BUTTON'){
      this.#botao = Object(valor);
    } else {
      console.error('Tipo esperado BUTTON!');
    }
  }
  get botao(){
    return Object(this.#botao);
  }
  set desabilitado(valor){
    this.#desabilitado = Boolean(valor);
    this.botao.disabled = this.desabilitado;
    this.botao.innerHTML = this.desabilitado ? '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Carregando...</span>' : this.texto;
  }
  get desabilitado(){
    return Boolean(this.#desabilitado);
  }
  set texto(valor){
    this.#texto = String(valor);
  }
  get texto(){
    return String(this.#texto);
  }
}