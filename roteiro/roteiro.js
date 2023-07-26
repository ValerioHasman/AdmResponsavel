import APIs from './modelos/APIs.js';
import FerramentaDica from './modelos/FerramentaDica.js';
import Formulario from './modelos/Formulario.js';
import Modais from './modelos/Modais.js';
import Pessoa from './modelos/Pessoa.js';
import Tabela2 from './modelos/Tabela2.js';

const txtjson = document.getElementById('json');
const tabela = document.getElementById('tabela');
const tb = new Tabela2(tabela, txtjson);

document.getElementById('ler').onclick = ler;
document.getElementById('gravarObj').onclick = gravarObj;
document.getElementById('formulario').onsubmit = submitForm;
document.getElementById('nomeNovo').oninput = (e)=>{ 
  e.target.value = Pessoa.tratarEspacosELetras(e.target.value);
}

FerramentaDica.carregarDicas(document);

function ler(){
  APIs.ler(this, tb);
}

function gravarObj(){
  APIs.gravarObj(this, tb);
}

function submitForm(e){

  const formulario = new Formulario(e);

  const input = formulario.target[0];

  formulario.desabilitado = true;

  function focar(){
    formulario.desabilitado = false;
    input.focus();
  }

  const pessoa = new Pessoa();

  try {
    pessoa.nome = input.value;
    tb.novaPessoa(pessoa.nome);
    input.value = '';
    focar();
  } catch (err) {
    new Modais('<i class="bi bi-exclamation-octagon"></i> Nome inválido', err.message, focar).exibe();
  }
}
