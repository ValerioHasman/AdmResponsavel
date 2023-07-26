import * as bootstrap from 'bootstrap';

export default class Notificacoes{

  #notifica = Object();
  #tipo = String();
  #frase = String();
  #icone = String();
  #toastContainer = function () {
    let container = document.querySelector('.toast-container');
    if(container == null){
      container = document.createElement('div');
      container.classList.add("toast-container", "position-fixed", "bottom-0", "end-0", "p-3");
      document.body.appendChild(container);
    }
    return container;
  }

  constructor(tipo = 'primary', frase = "Ok!"){
    this.tipo = tipo;
    this.frase = frase;
  }

  set tipo(valor){
    valor = String(valor);
    switch(valor){
      case 'primary':
      case 'success':
      case 'warning':
      case 'danger':
      case 'light':
      case 'dark':
      case 'secondary':
      case 'info':
        this.#tipo = valor;
        break;
      default:
        this.#tipo = 'primary';
        break;
    }
  }

  set frase(valor){
    this.#frase = String(valor);
  }

  get tipo(){
    return this.#tipo;
  }

  get frase(){
    return this.#frase;
  }

  get frase(){
    return this.#frase;
  }

  get notifica(){
    return this.#notifica;
  }

  exibe(){
    this.#notifica = this.criaANotificacao();
    this.#toastContainer().appendChild(this.#notifica);
    const notificar = bootstrap.Toast.getOrCreateInstance(this.#notifica);
    notificar.show();
    this.#notifica.addEventListener('hidden.bs.toast', this.apagaANotificacao);
  }

  criaANotificacaos(){
    const notificacao = document.createElement('div');
    notificacao.classList.add("toast", "align-items-center", `text-bg-${this.tipo}`, "border-2", "btn-close-white");
    notificacao.setAttribute("role", "alert");
    notificacao.setAttribute("aria-live", "assertive");
    notificacao.setAttribute("aria-atomic", "true");
    const div = document.createElement('div');
    div.classList.add("d-flex");
    const divbd = document.createElement('div');
    div.classList.add("toast-body");
    const button = document.createElement('button');
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-dismiss", "toast");
    button.setAttribute("aria-label", "Close");
    button.classList.add("btn-close", "me-2", "m-auto", "m-auto");
    const texto =  document.createTextNode(this.frase)
    divbd.innerHTML = this.icone;
    divbd.appendChild(texto);
    div.appendChild(divbd);
    div.appendChild(button);
    notificacao.appendChild(div);

    return notificacao;
  }

  criaANotificacao(){
    const notificacao = document.createElement('div');
    notificacao.classList.add("toast", "align-items-center", `text-bg-${this.tipo}`, "border-2", "btn-close-white");
    notificacao.setAttribute("role", "alert");
    notificacao.setAttribute("aria-live", "assertive");
    notificacao.setAttribute("aria-atomic", "true");

    notificacao.insertAdjacentHTML('beforeend',
`
<div class="d-flex">
  <div class="toast-body">
  ${this.icone}${this.frase}
  </div>
  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
</div>
`);

    return notificacao;
  }


  apagaANotificacao(e){
    e.target.parentNode.removeChild(e.target);
    e.target.removeEventListener('hidden.bs.toast', this.apagaANotificacao);
  }

  get icone(){
    switch(this.#tipo){
      case 'primary':
      case 'success':
        this.#icone = '<i class="bi bi-check-lg"></i> ';
        break;
      case 'warning':
        this.#icone = '<i class="bi bi-exclamation-octagon"></i> ';
        break;
      case 'danger':
        this.#icone = '<i class="bi bi-x-octagon"></i> ';
        break;
      case 'light':
      case 'dark':
      case 'secondary':
      case 'info':
        this.#icone = '';
        break;
      default:
        this.#icone = '';
        break;
    }
    return this.#icone;
  }
}