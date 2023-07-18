import Modais from "./Modais.js";
import Pessoa from "./Pessoa.js";

export default class Tabela2 {
  #tabela = Object();
  #txtjson = Object();
  #dados = {pessoas: Array(0)};

  constructor(tabela, txtjson, dados = this.dados){
    this.tabela = tabela;
    this.txtjson = txtjson;
    this.dados = dados;
  }

  set tabela(valor){
    if (valor.tagName == 'TABLE'){
      this.#tabela = Object(valor);
    } else {
      console.error('Tipo esperado TABLE!');
    }
  }
  set txtjson(valor){
    if (valor.tagName == 'TEXTAREA'){
      this.#txtjson = Object(valor);
    } else {
      console.error('Tipo esperado TEXTAREA!');
    }
  }
  set dados(valor){
    this.#dados = Object(valor);
  }

  get tabela(){
    return Object(this.#tabela);
  }
  get txtjson(){
    return Object(this.#txtjson);
  }
  get dados(){
    return Object(this.#dados);
  }

  reCriarTabela(){
    tabela.innerHTML =
    '<thead>' +
      '<tr>' +
        '<th colspan="2" scope="col">Pessoas:</th>' +
      '</tr>' +
    '</thead>';

    this.criaPessoaNaTabela();
    this.criaEventos();
  }

  criaPessoaNaTabela(){
    this.dados.pessoas.forEach((pessoa, posicao) => {
      const idPessoa = "pessoa" + posicao;

      this.tabela.innerHTML +=
      '<tbody id="' + idPessoa + '">' +
        '<tr class="table-active">' +
          '<td>' + pessoa.nome + '</td>' +
          '<td class="d-flex justify-content-end">'+
            '<button '+
            'id="'+ "del" + idPessoa +'" ' +
            'class="btn btn-outline-danger btn-sm" type="button" >' +
              '<i class="bi bi-trash"></i>'+
            '</button>'+
          '</td>' +
        '</tr>' +
        this.criaFilhosNaTabela(pessoa.filhos, idPessoa) +
        '<tr class="adicionarFilho">' +
          '<td class="pb-4" colspan="2">'+
            '<div class="d-flex justify-content-end">'+
              '<button id="'+ "add" + idPessoa +'" class="btn btn-outline-secondary btn-sm" type="button">'+
                '<i class="bi bi-plus-lg"></i>'+
              '</button>'+
            '</div>'+
          '</td>' +
        '</tr>' +
      '</tbody>';
    });
  }

  criaFilhosNaTabela(filhos = Array(), idPessoa){

    let tbsFilho = '';

    filhos.forEach((filho, posicao) => {
      const idFilho = idPessoa + 'filho' + posicao;

      tbsFilho +=
      '<tr class="filho">' +
        '<td class="nome">' + filho + '</td>' +
        '<td class="d-flex justify-content-end">'+
          '<button '+
          'id="'+ 'del' + idFilho +'"'+
          'class="btn btn-outline-danger btn-sm" type="button">'+
            '<i class="bi bi-trash"></i>'+
          '</button>'+
        '</td>' +
      '</tr>';
    });

    return tbsFilho;
  }

  criaEventos(){
    this.dados.pessoas.forEach((pessoa, posicao) => {
      const idPessoa = "pessoa" + posicao;
      document.getElementById('del' + idPessoa).onclick = ()=>{
        this.deletePessoa(posicao)
      };
      document.getElementById('add' + idPessoa).onclick = ()=>{
        this.modalAdicionarFilho(posicao)
      };
      pessoa.filhos.forEach((filho, fposicao)=>{
        const idFilho = idPessoa + 'filho' + fposicao;
        document.getElementById('del' + idFilho).onclick = ()=>{
          this.deleteFilho(posicao, fposicao);
        };
      })
    });
  }

  deletePessoa(posicao) {
    this.dados.pessoas.splice(posicao,1);
    this.atualiza();
  }
  
  deleteFilho(posicao, fposicao){
    this.dados.pessoas[posicao].filhos.splice(fposicao,1);
    this.atualiza();
  }

  modalAdicionarFilho(idPessoa){

    const form = 
    '<form id="novoFilho" class="row">' +
      '<div class="pe-2 col-auto"><label class="col-form-label" for="nomeFilho">Nome:</label></div>' +
      '<div class="ps-2 col"><input required class="form-control" type="text" id="nomeFilho" /></div>' +
      '<div class="d-grid gap-2 mt-3">' +
        '<button class="btn btn-primary" type="submit" type="button">Adicionar</button>' +
      '</div>' +
    '</form>';

    const modal = new Modais(refilModal, 'Novo filho', form, undefined, ()=>{this.trataForm(modal, idPessoa)});
    modal.exibe()

  }

  trataForm(modal, idPessoa){
    const input = refilModal.querySelector('#nomeFilho');
    input.focus();
    input.oninput = ()=>{
      input.value = input.value.replace(/[^\p{L}\s]/gu,'');
      input.value = input.value.replace(/\s{2,}/gu,' ');
    };

    const formNode = refilModal.querySelector('#novoFilho');
    formNode.onsubmit = (e) => {
      e.preventDefault();
      modal.fecha();
      const pessoa = new Pessoa();

      console.log(this.dados)
      console.log(this.dados.pessoas[idPessoa])
      console.log(idPessoa)

      try {
        pessoa.nome = e.target[0].value;
        this.dados.pessoas[idPessoa].filhos.push(pessoa.nome);
        this.atualiza();
      } catch (err) {
        new Modais(refilModal, '<i class="bi bi-exclamation-octagon"></i> Nome inválido', err.message).exibe();
      }
    }
  }

  novaPessoa(nomeNovo){
    this.dados.pessoas.push(
      this.objetoPessoa(nomeNovo)
    );
    this.atualiza();
  }
  
  objetoPessoa(nome){
    return {
      nome: nome,
      filhos: []
    }
  }

  adicionarFilho(idPessoa, nomeFilho){
    this.dados.pessoas[idPessoa].filhos.push(nomeFilho);
  }

  atualizaTxtArea(){
    this.txtjson.value = (JSON.stringify(this.dados, null, 2));
  }

  atualiza(){
    this.atualizaTxtArea();
    this.reCriarTabela();
  }
}