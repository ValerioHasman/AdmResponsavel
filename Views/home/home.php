<div class="bg-success-subtle py-2 container-fluid">
  <div class="row">
    <div class="px-2 col d-grid gap-2">
      <button id="gravarObj" type="button" class="btn btn-warning bg-gradient" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Gravar dados"><i class="bi bi-upload"></i></button>
    </div>
    <div class="px-2 col d-grid gap-2">
      <button id="ler" type="button" class="btn btn-success bg-gradient" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Carregar dados"><i class="bi bi-download"></i></button>
    </div>
    <div class="px-2 col col-sm-7 col-lg-9">
      <a target="_blank" class="btn btn-link" href="https://github.com/ValerioHasman/TurimRTE" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="GitHub Do projeto"><i class="bi bi-github"></i></a>
    </div>
  </div>  
  <form id="formulario" class="row mt-2">
    <div class="px-2 col-auto"><label class="col-form-label" for="nomeNovo">Nome:</label></div>
    <div class="px-2 col-md-auto col-md-5 col-lg-4 col"><input required class="form-control" type="text" id="nomeNovo" /></div>
    <div class="px-2 col-auto"><button class="btn btn-primary bg-gradient px-sm-5" type="submit" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Inserir responsável"><i class="bi bi-plus-lg"></i></button></div>
  </form>
</div>
<br />
<div class="container-fluid">
  <div class="row">
    <div class="col-md">
        <table class="table table-sm align-middle table-borderless" id="tabela">
        <thead>
          <tr>
            <th colspan="2" scope="col">Pessoas</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="col">
      <textarea readonly id="json" class="form-control font-monospace" rows="20"></textarea>
    </div>
  </div>
</div>