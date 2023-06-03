import { Botoes } from './modelos/Botoes.js'
import { Tabela } from './modelos/Tabela.js';

const txtjson = document.getElementById('json');
const tabela = document.getElementById('tabela');
const tb = new Tabela(tabela, txtjson);

document.getElementById('ler').addEventListener('click',ler);
document.getElementById('gravarObj').addEventListener('click',gravarObj);
document.getElementById('formulario').addEventListener('submit',submitForm);
document.getElementById('gravadoModal').addEventListener('shown.bs.modal', () => { document.getElementById('btnOkGravado').focus() })

carregarTooltips(document)

function carregarTooltips(parteDoDocumento){
  const tooltipTriggerList = parteDoDocumento.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  tooltipList.forEach((dica)=>{
    dica._element.addEventListener('click',()=>{dica.hide()});
  });
}

function submitForm(e){
  e.preventDefault();
  tb.novaPessoa(this.querySelector('input#nomeNovo').value);
  this.querySelector('input').value = '';
}

function mensagemDeGravado(){

  (new bootstrap.Modal('#gravadoModal')).show();

  return "Gravado com sucesso!";
}

function gravarObj() {
  const botao = new Botoes(this);
  botao.desabilitado = true;

  fetch(document.baseURI + 'home/gravarObj',
    {
      method: 'POST',
      body: JSON.stringify(tb.dados),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(resp => {
      console.log( resp.status == 200 ? mensagemDeGravado() : 'Erro!' );
    })
    .catch(err => console.log(err))
    .finally(()=>{
      botao.desabilitado = false;
    });
}

function ler(){
  const botao = new Botoes(this);
  botao.desabilitado = true;

  fetch(document.baseURI + 'home/json',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(resp => resp.json())
  .then(data => {
    tb.dados = data;
    tb.atualiza();
  })
  .catch(err => console.log(err))
  .finally(()=>{
    botao.desabilitado = false;
  });
}
