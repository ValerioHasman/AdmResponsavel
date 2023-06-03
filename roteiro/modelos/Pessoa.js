export class Pessoa {
  #nome = String();

  set nome(valor){
    this.#nome = String(valor);
  }
  get nome(){
    return String(this.#nome);
  }
}