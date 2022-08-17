<button type="button" onclick="gravar()">Gravar</button>
<button type="button" onclick="ler()">Ler</button>
<a target="_blank" href="https://github.com/ValerioHasman/TurimRTE">GitHub do projeto</a>
<br />
<br />
<label for="nome">Nome</label>
<input type="text" id="nomeNovo" />
<button type="button" onclick="novaPessoa()">Incluir</button>
<br />
<br />
<div style="display: inline-block;">
  <div class="dados">
    <table id="tabela">
      <thead>
        <tr>
          <th colspan="2" scope="col">Pessas</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="dados">
    <textarea readonly id="json" cols="100" rows="40"></textarea>
  </div>
</div>