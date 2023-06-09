<div class="bg-success-subtle py-2 container-fluid">
  <div class="row">
    <div class="px-2 col d-grid gap-2">
      <button id="gravarObj" type="button" class="btn btn-warning bg-gradient" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Gravar dados"><i class="bi bi-upload"></i></button>
    </div>
    <div class="px-2 col d-grid gap-2">
      <button id="ler" type="button" class="btn btn-success bg-gradient" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Carregar dados"><i class="bi bi-download"></i></button>
    </div>
    <div class="px-2 col col-sm-7 col-lg-9">
      <a target="_blank" class="btn btn-link" href="https://github.com/ValerioHasman/TurimRTE" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="GitHub Do projeto"><i class="bi bi-github"></i></a>
    </div>
  </div>  
</div>
<div class="bg-success-subtle py-2 container-fluid">
  <form id="formulario" class="row">
    <div class="px-2 col-auto"><label class="col-form-label" for="nomeNovo">Nome:</label></div>
    <div class="px-2 col-sm-auto col"><input required class="form-control" type="text" id="nomeNovo" /></div>
    <div class="px-2 col-auto"><button class="btn btn-primary bg-gradient px-4" type="submit" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Inserir responsável"><i class="bi bi-plus-lg"></i></button></div>
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


<!-- Modal -->
<div class="modal fade" id="refilModal" tabindex="-1" aria-labelledby="refilModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="refilModalLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
      </div>
    </div>
  </div>
</div>