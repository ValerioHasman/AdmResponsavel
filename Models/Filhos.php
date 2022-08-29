<?php

namespace Models;

class Filhos extends Pessoas
{

  public function __construct(){}

  public function insereNoBanco()
  {
    $sql = Conexao::getConexao()->prepare('INSERT INTO `TESTE_RTE`.`FILHO` (`ID`, `PESSOA_ID`, `NOME`) VALUES
    (NULL, :id, :nome)');
    $sql->bindValue(':id', $this->id);
    $sql->bindValue(':nome', $this->nome);
    $sql->execute();
  }

  public static function pegarPessoas(): array
  {
    $sql = Conexao::getConexao()->prepare(
      "SELECT
      `F`.`PESSOA_ID` `id`,
      `F`.`NOME` `nome`
      FROM `FILHO` `F`"
    );
    $sql->execute();
    if ($sql->rowCount() > 0) {
      return array('filho' => $sql->fetchAll(\PDO::FETCH_ASSOC));
    }
    return array('filho' => []);
  }

}
