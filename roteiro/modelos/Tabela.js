export class Tabela {
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
  }
  
  criaPessoaNaTabela(){
    var conta = 0;
    const arrAdicionarFilho = [];
    const arrDeleteFilho = [];
    const arrDeletePessoa = [];
  
    this.dados.pessoas.forEach(pessoa => {
      const nome = 'filhoDe' + pessoa.nome;
      arrAdicionarFilho.push({nome: nome, responsavel: pessoa.nome});
      const dadosFilhos = this.criaFilhosNaTabela(pessoa.filhos, conta);
      arrDeleteFilho.push(dadosFilhos.nomes);
      const deleta = 'delete' + pessoa.nome;
      arrDeletePessoa.push({nome: deleta, conta: conta});
  
      this.tabela.innerHTML +=
      '<tbody id="' + pessoa.nome + '">' +
        '<tr class="table-active">' +
          '<td>' + pessoa.nome + '</td>' +
          '<td class="d-flex justify-content-end">'+
            '<button data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Excluir pessoa" '+
            'id="'+ deleta +'" ' +
            'class="btn btn-outline-danger btn-sm" type="button" >' +
              '<i class="bi bi-trash"></i>'+
            '</button>'+
          '</td>' +
        '</tr>' +
        dadosFilhos.tbfilhos +
        '<tr class="adicionarFilho">' +
          '<td class="pb-4" colspan="2">'+
            '<div class="d-flex justify-content-end">'+
              '<button data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Adicionar filho" id="'+ nome +'" class="btn btn-outline-secondary btn-sm" type="button">'+
                '<i class="bi bi-plus-lg"></i>'+
              '</button>'+
            '</div>'+
          '</td>' +
        '</tr>' +
      '</tbody>';
      
      conta++;
    });
  
    arrAdicionarFilho.forEach(nome => {
      document.getElementById(nome.nome).onclick = ()=>{
        const tabelaTooltip = bootstrap.Tooltip.getInstance('#'+ nome.nome);
        this.adicionarFilho(nome.responsavel);
        tabelaTooltip.dispose();
      };
    });
  
    arrDeleteFilho.forEach(arrFilho => {
      arrFilho.forEach(nome =>{
        document.getElementById(nome.nome).onclick = ()=>{
          const tabelaTooltip = bootstrap.Tooltip.getInstance('#'+ nome.nome);
          this.deleteFilho(nome.idp, nome.idf);
          tabelaTooltip.dispose();
        };
      });
    });
  
    arrDeletePessoa.forEach(nome => {
      document.getElementById(nome.nome).onclick = ()=>{
        const tabelaTooltip = bootstrap.Tooltip.getInstance('#'+ nome.nome);  
        this.deletePessoa(nome.conta);
        tabelaTooltip.dispose();
      };
    });
  
    this.carregarTooltips(document.getElementById('tabela'));
  
  }
  
  criaFilhosNaTabela(filhos, idp){
    let tbfilhos = '';
    let idf = 0;
    const nomes = [];
  
    filhos.forEach(filho => {
      const nome = 'deleteFilho' + filho;
      nomes.push({
        nome: nome,
        idf: idf,
        idp: idp
      });
  
      tbfilhos += '<tr class="filho">' +
      '<td class="nome">' + filho + '</td>' +
      '<td class="d-flex justify-content-end">'+
        '<button data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Excluir filho" '+
        'id="'+ nome +'"'+
        'class="btn btn-outline-danger btn-sm" type="button">'+
          '<i class="bi bi-trash"></i>'+
        '</button>'+
      '</td>' +
      '</tr>';
      idf++;
    });
  
    return {tbfilhos: tbfilhos, nomes: nomes};
  }
  
  adicionarFilho(nome) {
    let nomeFilho = window.prompt('Informe o nome', '');
  
    if(this.naoEhVazio(nomeFilho)){
  
      let conte = 0;
      this.dados.pessoas.forEach(pessoa => {
        if(pessoa.nome == nome){
          this.dados.pessoas[conte].filhos.push(nomeFilho)
        }
        conte++;
      });
      this.atualiza();
    }
  }
  
  novaPessoa(nomeNovo){
    if(this.naoEhVazio(nomeNovo)){
      this.dados.pessoas.push(
        this.objetoPessoa(nomeNovo)
      );
      this.atualiza();
    }
  }
  
  naoEhVazio(valor){
    if(valor != '' & valor != ' ' & valor != null & typeof valor == 'string'){
      return true;
    }
    return false;
  }
  
  objetoPessoa(nome){
    return {nome: nome,
            filhos: []
    }
  }
  
  deleteFilho(idp, idf){
    this.dados.pessoas[idp].filhos.splice(idf,1);
    this.atualiza();
  }
  
  deletePessoa(idp) {
    this.dados.pessoas.splice(idp,1);
    this.atualiza();
  }

  atualizaTxtArea(){
    this.txtjson.value = (JSON.stringify(this.dados, null, 2));
  }

  atualiza(){
    this.atualizaTxtArea();
    this.reCriarTabela();
  }

  carregarTooltips(parteDoDocumento){
    const tooltipTriggerList = parteDoDocumento.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    tooltipList.forEach((dica)=>{
      dica._element.addEventListener('click',()=>{dica.hide()});
    });
  }
  
}