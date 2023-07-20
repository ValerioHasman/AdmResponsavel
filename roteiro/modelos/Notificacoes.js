export default class Notificacoes{

  #toastContainer = Object();
  #notifica = Object();
  #tipo = String();
  #frase = String();

  constructor(toastContainer, tipo = 'primary', frase = "Ok!"){
    this.#toastContainer = toastContainer;
    this.tipo = tipo;
    this.frase = frase;
  }

  set tipo(valor){
    valor = String(valor);
    switch(valor){
      case 'primary':
      case 'secondary':
      case 'success':
      case 'info':
      case 'warning':
      case 'danger':
      case 'light':
      case 'dark':
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

  exibe(){
    this.#notifica = this.criaANotificacao();
    this.#toastContainer.appendChild(this.#notifica);
    const notificar = bootstrap.Toast.getOrCreateInstance(this.#notifica);
    notificar.show();
    this.apagaANotificacao();
  }

  criaANotificacao(){
    const notificacao = document.createElement('div');
    notificacao.classList.add("toast", "align-items-center", `text-bg-${this.tipo}`, "border-2");
    notificacao.setAttribute("role", "alert");
    notificacao.setAttribute("aria-live", "assertive");
    notificacao.setAttribute("aria-atomic", "true");
    const div = document.createElement('div');
    div.classList.add("d-flex");
    const divbd = document.createElement('div');
    div.classList.add("toast-body");
    const texto =  document.createTextNode(this.frase)
    divbd.appendChild(texto);
    div.appendChild(divbd);
    notificacao.appendChild(div);

    return notificacao;
  }

  apagaANotificacao(){
    setTimeout(() => {
      this.#toastContainer.removeChild(this.#notifica);
    }, 6000);
  }
}