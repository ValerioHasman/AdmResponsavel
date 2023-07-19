export default class Pessoa {

  /**
   * Não pode começar com espaço;
   * Não pode ter mais de um espaço entre palavras;
   * Não pode conter mais que três letras iguais consecutivas; X
   * A primeira parte do nome deve ter pelo menos 3 caracteres;
   */

  #nome = String();

  constructor(){}

  set nome(valor){
    let nome = String(valor);
    nome = this.apenasLetras(nome);
    this.nomeTemTamanho(nome);
    this.primeiroNomeTemTamanho(nome);
    this.letrasConsecutivas(nome);
    this.#nome = nome;
  }

  get nome(){
    return String(this.#nome);
  }

  apenasLetras(nome){
    const regex = /[^\p{L}\s]|\s{2,}/gu;
    const nada = '';
    nome = nome.replace(regex, nada);
    nome = nome.trim();
    return String(nome);
  }

  nomeTemTamanho(nome){
    if(nome.length < 3){
      throw new Error('O nome não pode ter menos que três letras.');
    }
  }

  primeiroNomeTemTamanho(nome){
    if(nome.split(' ')[0].length < 3){
      throw new Error('O primeiro nome não pode ter menos que três letras.');
    }
  }

  letrasConsecutivas(nome){
    if((/(.)\1{2,}/gu).test(nome)){
      throw new Error('O nome não pode ter 3 ou mais letras consecutivas.');
    }
  }

  static tratarEspacosELetras(nome){
    nome = String(nome);
    nome = nome.replace(/[^\p{L}\s]/gu,'');
    nome = nome.replace(/\s{2,}/gu,' ');
    return nome;
  }
}