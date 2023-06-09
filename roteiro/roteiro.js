import { APIs } from './modelos/APIs.js';
import { Modais } from './modelos/Modais.js';
import { Pessoa } from './modelos/Pessoa.js';
import { Tabela } from './modelos/Tabela.js';

const txtjson = document.getElementById('json');
const tabela = document.getElementById('tabela');
const tb = new Tabela(tabela, txtjson);
const refilModal = document.getElementById('refilModal');
var ultimoFoco;

document.getElementById('ler').addEventListener('click',ler);
document.getElementById('gravarObj').addEventListener('click',gravarObj);
document.getElementById('formulario').addEventListener('submit',submitForm);
refilModal.addEventListener('shown.bs.modal', () => { document.querySelector('button.btn-secondary').focus() });
refilModal.addEventListener('hidden.bs.modal', () => { ultimoFoco.focus(); });

carregarTooltips(document);

function carregarTooltips(parteDoDocumento){
  const tooltipTriggerList = parteDoDocumento.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  tooltipList.forEach((dica)=>{
    dica._element.addEventListener('click',()=>{dica.hide()});
  });
}

function ler(){
  ultimoFoco = this;
  APIs.ler(this, tb)
}

function gravarObj(){
  ultimoFoco = this;
  APIs.gravarObj(this, tb, refilModal)
}

function submitForm(e){
  e.preventDefault();
  const input = this.querySelector('input');
  const button = this.querySelector('button');

  input.disabled = true;
  button.disabled = true;

  function funcao(){
    input.disabled = false;
    button.disabled = false;
  }

  ultimoFoco = input;
  const pessoa = new Pessoa();

  try {
    pessoa.nome = input.value;
    tb.novaPessoa(pessoa.nome);
    input.value = '';
    funcao();
  } catch (err) {
    new Modais(refilModal, 'Nome inválido', err.message, funcao).exibe();
  }
}
