export class Modais{

  #modal = Object();
  #titulo = String();
  #mensagem = String();

  constructor(modal, titulo, mensagem){
    this.modal = modal;
    this.titulo = titulo;
    this.mensagem = mensagem;
  }

  set modal(valor){
    this.#modal = Object(valor);
  }
  set titulo(valor){
    this.#titulo = String(valor);
  }
  set mensagem(valor){
    this.#mensagem = String(valor);
  }
  get modal(){
    return Object(this.#modal);
  }
  get titulo(){
    return String(this.#titulo);
  }
  get mensagem(){
    return String(this.#mensagem);
  }
  
  exibe(){
    (new bootstrap.Modal(this.modal)).show();
    this.modal.querySelector('h1').innerText = this.titulo;
    this.modal.querySelector('p').innerText = this.mensagem;
  }

}