import Botoes from "./Botoes.js";
import Notificacoes from "./Notificacoes.js";

export default class APIs {
  static ler(btn, tb){
    const botao = new Botoes(btn);
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
      new Notificacoes('primary', 'Lido com sucesso!').exibe();
    })
    .catch((err) => {
      new Notificacoes('danger', `Erro ao ler: ${err.message}!`).exibe();
    })
    .finally(()=>{
      botao.desabilitado = false;
    });
  }
  static gravarObj(btn, tb) {
    const botao = new Botoes(btn);
    botao.desabilitado = true;
  
    fetch(document.baseURI + 'home/gravarObj',
      {
        method: 'POST',
        body: JSON.stringify(tb.dados),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(resp => {
        if(resp.status == 200){
          new Notificacoes('success', 'Gravado com sucesso!').exibe();
        } else {
          new Notificacoes('danger', `Erro: Não foi possível gravar`).exibe();
        }
      })
      .catch((err) => {
        new Notificacoes('danger', `Erro ao gravar: ${err.message}`).exibe();
      })
      .finally(()=>{
        botao.desabilitado = false;
      });
  }
}