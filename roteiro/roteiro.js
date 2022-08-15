var txtjson = document.getElementById('json');
var tabela = document.getElementById('tabela');

fetch(document.baseURI + 'home/json',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(resp => resp.json())
  .then(data => {
    txtjson.innerHTML = (JSON.stringify(data, null, 2))
    criarTabela(data);
  })
  .catch(err => console.log(err))
;

function criarTabela(data){
  tabela.innerHTML =
  '<thead>' +
    '<tr>' +
      '<th colspan="2" scope="col">Pessas</th>' +
    '</tr>' +
  '</thead>';
  data.pessoas.map((pessoa) => (criaPessoa(pessoa)));
}

function criaPessoa(nome){
  tabela.innerHTML +=
  '<tbody id="' + nome.nome + '">' +
    '<tr class="pessoa">' +
      '<td>' + nome.nome + '</td>' +
      '<td><button type="button">Remover</button></td>' +
    '</tr>' +
    criaFilhos(nome.filhos) +
    '<tr class="adicionarFilho">' +
      '<td colspan="2"><button type="button" onclick="adicionarFilho(\'' + nome.nome + '\')">Adicionar filho</button></td>' +
    '</tr>' +
  '</tbody>';
}

function criaFilhos(filhos){
  var tbfilhos = '';

  filhos.forEach(filho => {
    tbfilhos += '<tr class="filho">' +
    '<td class="nome">' + filho + '</td>' +
    '<td><button type="button">Remover filho</button></td>' +
  '</tr>';
  });

  return tbfilhos;
}

function adicionarFilho(nome) {
  var elementoNome = window.document.getElementById(nome);
  var nomeFilho = window.prompt('Informe o nome', '');

  if(nomeFilho != '' && nomeFilho != ' '){
    var div = elementoNome.getElementsByClassName('adicionarFilho')[0];
    div.insertAdjacentHTML('beforebegin',
    '<tr class="filho">' +
      '<td class="nome">' + nomeFilho + '</td>' +
      '<td><button type="button">Remover filho</button></td>' +
    '</tr>'
  );
  }

  

}