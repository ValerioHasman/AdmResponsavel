var txtjson = document.getElementById('json');
var tabela = document.getElementById('tabela');
var dados;

fetch(document.baseURI + 'home/json',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(resp => resp.json())
  .then(data => {
    dados = data;
    atualiza();
  })
  .catch(err => console.log(err))
;

function reCriarTabela(){
  tabela.innerHTML =
  '<thead>' +
    '<tr>' +
      '<th colspan="2" scope="col">Pessas</th>' +
    '</tr>' +
  '</thead>';
  criaPessoaNaTabela();
}

function criaPessoaNaTabela(){
  var conta = 0;
  dados.pessoas.forEach(pessoa => {
    tabela.innerHTML +=
    '<tbody id="' + pessoa.nome + '">' +
      '<tr class="pessoa">' +
        '<td>' + pessoa.nome + '</td>' +
        '<td><button type="button" ' +
        'onclick="deletePessoa(' + conta + ')"' +
        '>Remover</button></td>' +
      '</tr>' +
      criaFilhosNaTabela(pessoa.filhos, conta) +
      '<tr class="adicionarFilho">' +
        '<td colspan="2"><button type="button" onclick="adicionarFilho(\'' +
        pessoa.nome +
        '\')">Adicionar filho</button></td>' +
      '</tr>' +
    '</tbody>';
    conta++;
  });
}

function criaFilhosNaTabela(filhos, idp){
  var tbfilhos = '';
  var idf = 0;

  filhos.forEach(filho => {
    tbfilhos += '<tr class="filho">' +
    '<td class="nome">' + filho + '</td>' +
    '<td><button type="button"'+
    'onclick="deleteFilho('+ idp +', ' + idf + ')"'+
    '>Remover filho</button></td>' +
    '</tr>';
    idf++;
  });

  return tbfilhos;
}

function adicionarFilho(nome) {
  var nomeFilho = window.prompt('Informe o nome', '');

  if(naoEhVazio(nomeFilho)){

    let conte = 0;
    dados.pessoas.forEach(pessoa => {
      if(pessoa.nome == nome){
        dados.pessoas[conte].filhos.push(nomeFilho)
      }
      conte++;
    });
    atualiza();
  }
}

function novaPessoa(){

  nomeNovo = document.getElementById('nomeNovo').value

  if(naoEhVazio(nomeNovo)){
    dados.pessoas.push(
      objetoPessoa(nomeNovo)
    );
    atualiza();
  }
}

function naoEhVazio(valor){
  if(valor != '' & valor != ' ' & valor != null & typeof valor == 'string'){
    return true;
  }
  return false;
}

function objetoPessoa(nome){
  return {nome: nome,
          filhos: []
  }
}

function deleteFilho(idp, idf){
  dados.pessoas[idp].filhos.splice(idf,1);
  atualiza();
}

function deletePessoa(idp) {
  dados.pessoas.splice(idp,1);
  atualiza();
}

function atualiza(){
  atualizaTxtArea();
  reCriarTabela();
}

function atualizaTxtArea(){
  txtjson.innerHTML = (JSON.stringify(dados, null, 2));
}
