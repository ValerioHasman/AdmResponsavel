const txtjson = document.getElementById('json');
const tabela = document.getElementById('tabela');

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
  data.pessoas.map((pessoa) => (criaPessoa(pessoa.nome)));
}

function criaPessoa(nome){
  tabela.innerHTML +=
  '<tbody id="' + nome + '">' +
    '<tr class="pessoa">' +
      '<td>' + nome + '</td>' +
      '<td><button type="button">Remover</button></td>' +
    '</tr>' +
    '<tr class="filho">' +
      '<td class="nome">Pedro</td>' +
      '<td><button type="button">Remover filho</button></td>' +
    '</tr>' +
    '<tr class="filho">' +
      '<td class="nome">Pedro</td>' +
      '<td><button type="button">Remover filho</button></td>' +
    '</tr>' +
    '<tr class="adicionarFilho">' +
      '<td colspan="2" scope="col"><button type="button">Adicionar filho</button></td>' +
    '</tr>' +
  '</tbody>';
}