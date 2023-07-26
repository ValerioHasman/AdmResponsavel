import * as bootstrap from 'bootstrap';

export default class FerramentaDica{
  static carregarDicas(parteDoDocumento){
    const tooltipTriggerList = parteDoDocumento.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    tooltipList.forEach((dica)=>{
      dica._element.addEventListener('click',()=>{dica.hide()});
    });
  }
}