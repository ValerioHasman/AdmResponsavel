import * as bootstrap from 'bootstrap';

export default class Modais{

  #modal = Object();
  #titulo = String();
  #mensagem = String();
  #funcaoAoFechar = Function();
  #funcaoAoIniciar = Function();
  #bootstrapModal = Object();

  constructor(titulo = '', mensagem = '', funcaoAoFechar = Function(), funcaoAoIniciar = Function()){
    this.modal = this.criaModal();

    this.titulo = titulo;
    this.mensagem = mensagem;
    this.funcaoAoIniciar = funcaoAoIniciar;
    this.funcaoAoFechar = funcaoAoFechar;

    this.modal.addEventListener('shown.bs.modal', this.funcaoAoIniciar);
    this.modal.addEventListener('hidden.bs.modal', this.funcaoAoFechar);
  }

  set modal(valor){
    this.#modal = Object(valor);
    this.#bootstrapModal = new bootstrap.Modal(this.modal);
  }
  set titulo(valor){
    this.#modal.querySelector('h1').innerHTML = valor;
    this.#titulo = String(valor);
  }
  set mensagem(valor){
    this.#modal.querySelector('.modal-body').innerHTML = valor;
    this.#mensagem = String(valor);
  }
  set funcaoAoFechar(valor){
    if(typeof Function() != typeof valor){
      throw new TypeError('Função inválida');
    }
    this.#funcaoAoFechar = ()=>{
      valor();
      this.apagaModalNoDom();
      this.modal.removeEventListener('hidden.bs.modal', this.funcaoAoFechar);
    };
  }
  set funcaoAoIniciar(valor){
    if(typeof Function() != typeof valor){
      throw new TypeError('Função inválida');
    }
    this.#funcaoAoIniciar = ()=>{
      this.modal.querySelector('button.btn-secondary').focus();
      valor();
      this.modal.removeEventListener('shown.bs.modal', this.funcaoAoIniciar);
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
  get funcaoAoFechar(){
    return this.#funcaoAoFechar;
  }
  get funcaoAoIniciar(){
    return this.#funcaoAoIniciar;
  }
  get bootstrapModal(){
    return this.#bootstrapModal;
  }
  
  exibe(){
    document.body.appendChild(this.modal);
    this.#bootstrapModal.show();
  }

  fecha(){
    this.#bootstrapModal.hide();
  }

  criaModal(){

    const modal = document.createElement('div');
    modal.classList.add("modal", "fade");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("tabindex", "-1");

    modal.insertAdjacentHTML('beforeend',
`<div class="modal-dialog modal-dialog-centered">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5"></h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
    </div>
  </div>
</div>`
    );

    return modal;
  }

  apagaModalNoDom(){
    document.body.removeChild(this.modal);
  }

}