export class Modais{

  #modal = Object();
  #titulo = String();
  #mensagem = String();
  #funcao = Function();

  constructor(modal, titulo, mensagem, funcao = this.funcao){
    this.modal = modal;
    this.titulo = titulo;
    this.mensagem = mensagem;
    this.funcao = funcao;

    this.modal.addEventListener('hide.bs.modal', this.funcao);
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
  set funcao(valor){
    if(typeof Function() != typeof valor){
      throw new Error('Função inválida');
    }
    this.#funcao = ()=>{
      valor();
      this.modal.removeEventListener('hide.bs.modal', this.funcao);
    };
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
  get funcao(){
    return this.#funcao;
  }
  
  exibe(){
    (new bootstrap.Modal(this.modal)).show();
    this.modal.querySelector('h1').innerText = this.titulo;
    this.modal.querySelector('p').innerText = this.mensagem;
  }

}