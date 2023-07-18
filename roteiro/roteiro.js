import APIs from './modelos/APIs.js';
import FerramentaDica from './modelos/FerramentaDica.js';
import Modais from './modelos/Modais.js';
import Pessoa from './modelos/Pessoa.js';
import Tabela2 from './modelos/Tabela2.js';

const txtjson = document.getElementById('json');
const tabela = document.getElementById('tabela');
const tb = new Tabela2(tabela, txtjson);
const refilModal = document.getElementById('refilModal');

document.getElementById('ler').addEventListener('click',ler);
document.getElementById('gravarObj').addEventListener('click',gravarObj);
document.getElementById('formulario').addEventListener('submit',submitForm);
document.getElementById('nomeNovo').oninput = (e)=>{ 
  e.target.value = e.target.value.replace(/[^\p{L}\s]/gu,''); 
  e.target.value = e.target.value.replace(/\s{2,}/gu,' ');
}
refilModal.addEventListener('shown.bs.modal', () => { document.querySelector('button.btn-secondary').focus() });

FerramentaDica.carregarDicas(document);

function ler(){
  APIs.ler(this, tb)
}

function gravarObj(){
  APIs.gravarObj(this, tb, refilModal)
}

function submitForm(e){
  e.preventDefault();
  const input = e.target[0];

  function focar(){
    input.focus();
  }

  const pessoa = new Pessoa();

  try {
    pessoa.nome = input.value;
    tb.novaPessoa(pessoa.nome);
    input.value = '';
  } catch (err) {
    new Modais(refilModal, 'Nome inválido', err.message, focar).exibe();
  }
}
