import Botoes from "./Botoes.js";
import Modais from "./Modais.js";
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
    })
    .catch(err => console.log(err))
    .finally(()=>{
      botao.desabilitado = false;
    });
  }
  static gravarObj(btn, tb, refilModal, toastContainer) {
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
          new Notificacoes(toastContainer, 'success', 'Gravado com sucesso!').exibe();
        } else {
          new Modais(
            refilModal,
            "Não gravado",
            "Erro ao gravar!",
            ()=>{btn.focus()}
          ).exibe();
        }
      })
      .catch((err) => {
        new Notificacoes(toastContainer, 'danger', `Erro: ${err.message}`).exibe();
      })
      .finally(()=>{
        botao.desabilitado = false;
      });
  }
}