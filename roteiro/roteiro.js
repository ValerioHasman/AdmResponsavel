import { APIs } from './modelos/APIs.js';
import { Tabela } from './modelos/Tabela.js';

const txtjson = document.getElementById('json');
const tabela = document.getElementById('tabela');
const tb = new Tabela(tabela, txtjson);
const refilModal = document.getElementById('refilModal');
var ultimoBtn;

document.getElementById('ler').addEventListener('click',ler);
document.getElementById('gravarObj').addEventListener('click',gravarObj);
document.getElementById('formulario').addEventListener('submit',submitForm);
refilModal.addEventListener('shown.bs.modal', () => { document.querySelector('button.btn-secondary').focus() });
refilModal.addEventListener('hidden.bs.modal', () => { ultimoBtn.focus() });

carregarTooltips(document);

function carregarTooltips(parteDoDocumento){
  const tooltipTriggerList = parteDoDocumento.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  tooltipList.forEach((dica)=>{
    dica._element.addEventListener('click',()=>{dica.hide()});
  });
}

function ler(){
  ultimoBtn = this;
  APIs.ler(this, tb)
}

function gravarObj(){
  ultimoBtn = this;
  APIs.gravarObj(this, tb, refilModal)
}

function submitForm(e){
  e.preventDefault();
  const input = this.querySelector('input#nomeNovo');
  tb.novaPessoa(input.value);
  input.value = '';
}
