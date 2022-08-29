<?php

namespace Models;

class Pessoas
{

  protected int $id;
  protected string $nome;

  public function __construct()
  {
  }

  public function __set($atributo, $value): void
  {
    if ($atributo == 'id') {
      $this->$atributo = (int) filter_var(trim($value), FILTER_SANITIZE_SPECIAL_CHARS);
    }
    if ($atributo == 'nome') {
      $this->$atributo = filter_var(trim($value), FILTER_SANITIZE_SPECIAL_CHARS);
    }
  }

  public function __get($atributo)
  {
    return $this->$atributo;
  }

  public function insereNoBanco()
  {
    $sqlm = Conexao::getConexao();
    $sql = $sqlm->prepare('INSERT INTO `TESTE_RTE`.`PESSOA` (`ID`, `NOME`) VALUES (NULL, :nome)');
    $sql->bindValue(':nome', $this->nome);
    $sql->execute();
    $this->id = $sqlm->lastInsertId();
  }

  public static function apagaNoBanco()
  {
    $sql = Conexao::getConexao()->prepare('DELETE FROM `FILHO`');
    $sql->execute();
    $sql = Conexao::getConexao()->prepare('DELETE FROM `PESSOA`');
    $sql->execute();
  }

  public static function pegarPessoas(): array
  {
    $sql = Conexao::getConexao()->prepare(
      "SELECT
      `P`.`ID` `id`,
      `P`.`NOME` `nome`
      FROM `PESSOA` P"
    );
    $sql->execute();
    if ($sql->rowCount() > 0) {
      return array('pessoas' => $sql->fetchAll(\PDO::FETCH_ASSOC));
    }
    return array('pessoas' => []);
  }

}
