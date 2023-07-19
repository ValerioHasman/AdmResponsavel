export default class Formulario {
  #formulario = Object();
  #target = Array();
  #desabilitado = Boolean();

  constructor(formulario){
    formulario.preventDefault();
    this.formulario = formulario;
  }

  set formulario (valor){
    if (valor.target.tagName == 'FORM'){
      this.#formulario = Object(valor);
      this.#target = valor.target;
    } else {
      console.error('Tipo esperado FORM, de um submit!');
    }
  }

  get formulario(){
    return Object(this.#formulario);
  }

  set desabilitado(valor){
    this.#desabilitado = Boolean(valor);

    Object.keys(this.target).forEach((item)=>{
      this.target[item].disabled = this.#desabilitado;
    });

  }

  get desabilitado(){
    return Boolean(this.#desabilitado);
  }

  get target(){
    return this.#target;
  }

}