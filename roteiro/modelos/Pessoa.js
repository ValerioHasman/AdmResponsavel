export class Pessoa {
  #nome = String();

  constructor(){}

  set nome(valor){
    let nome = String(valor);
    nome = this.apenasLetras(nome);
    this.#nome = nome;
    this.nomeTemTamanho(nome);
    this.primeiroNomeTemTamanho(nome);
    this.#nome = nome;
  }
  get nome(){
    return String(this.#nome);
  }

  apenasLetras(nome){
    const regex = /[^\p{L}\s]/gu;
    const nada = '';
    nome = nome.replace(regex, nada);
    nome = nome.trim();
    return String(nome);
  }

  nomeTemTamanho(nome){
    if(nome.length < 3){
      throw new Error('O nome foi tratado, mas é menor que três letras.');
    }
  }

  primeiroNomeTemTamanho(nome){
    if(nome.split(' ')[0].length < 3){
      throw new Error('O primeiro nome não pode ter menos que três letras.');
    }
  }
}