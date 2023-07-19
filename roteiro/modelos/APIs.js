import Botoes from "./Botoes.js";
import Modais from "./Modais.js";

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
  static gravarObj(btn, tb, refilModal, toastBootstrap) {
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
          toastBootstrap.show();
        } else {
          new Modais(
            refilModal,
            "Não gravado",
            "Erro ao gravar!",
            ()=>{btn.focus()}
          ).exibe();
        }
      })
      .catch(err => console.log(err))
      .finally(()=>{
        botao.desabilitado = false;
      });
  }
}