<button type="button">Gravar</button>
<button type="button">Ler</button>
<button type="button">Remover</button>
<button type="button">Remover filho</button>
<button type="button">Adicionar filho</button>
<br />
<br />
<label for="nome">Nome</label>
<input type="text" name="pessoa" id="nome">
<button type="button">Incluir</button>
<br />
<br />
<div class="dados">
  <table>
    <thead>
      <tr>
        <th colspan="2" scope="col">Pessas</th>
      </tr>
    </thead>
    <tbody>
      <tr class="pessoa">
        <td>Marcos</td>
        <td><button type="button">Remover</button></td>
      </tr>
      <tr class="filho">
        <td class="nome">Pedro</td>
        <td><button type="button">Remover filho</button></td>
      </tr>
      <tr class="filho">
        <td class="nome">Pedro</td>
        <td><button type="button">Remover filho</button></td>
      </tr>
      <tr class="adicionarFilho">
        <td colspan="2" scope="col"><button type="button">Adicionar filho</button></td>
      </tr>
    </tbody>
  </table>
</div>
<div class="dados">
  <textarea id="json" cols="30" rows="10"></textarea>
</div>