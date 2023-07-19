export default class Modais{

  #modal = Object();
  #titulo = String();
  #mensagem = String();
  #funcao = Function();
  #funcaoStart = Function();
  #bootstrapModal = Object();

  constructor(modal, titulo, mensagem, funcao = Function(), funcaoStart = Function()){
    this.modal = modal;
    this.titulo = titulo;
    this.mensagem = mensagem;
    this.funcao = funcao;
    this.funcaoStart = funcaoStart;

    this.modal.addEventListener('hidden.bs.modal', this.funcao);
    this.modal.addEventListener('shown.bs.modal', this.funcaoStart);
  }

  set modal(valor){
    this.#modal = Object(valor);
    this.#bootstrapModal = new bootstrap.Modal(this.modal);
  }
  set titulo(valor){
    this.#titulo = String(valor);
  }
  set mensagem(valor){
    this.#mensagem = String(valor);
  }
  set funcao(valor){
    if(typeof Function() != typeof valor){
      throw new Error('Função inválida');
    }
    this.#funcao = ()=>{
      valor();
      this.modal.removeEventListener('hidden.bs.modal', this.funcao);
    };
  }
  set funcaoStart(valor){
    if(typeof Function() != typeof valor){
      throw new Error('Função inválida');
    }
    this.#funcaoStart = ()=>{
      valor();
      this.modal.removeEventListener('shown.bs.modal', this.funcaoStart);
    };
  }
  get modal(){
    return this.#modal;
  }
  get titulo(){
    return String(this.#titulo);
  }
  get mensagem(){
    return String(this.#mensagem);
  }
  get funcao(){
    return this.#funcao;
  }
  get funcaoStart(){
    return this.#funcaoStart;
  }
  
  exibe(){
    this.#bootstrapModal.show();
    this.modal.querySelector('h1').innerHTML = this.titulo;
    this.modal.querySelector('p').innerHTML = this.mensagem;
  }

  fecha(){
    this.#bootstrapModal.hide();
  }

}