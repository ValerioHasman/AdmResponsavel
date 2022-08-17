<?php

namespace Models;

use PDO;

class Pessoa
{

  protected ?int $id;
  protected string $nome;

  public function __construct()
  {
  }

  public function __set($atributo, $value): void
  {
    if ($atributo == 'id') {
      $this->$atributo = (int) $value;
    }
    if ($atributo == 'nome') {
      $this->$atributo = filter_var(trim($value), FILTER_SANITIZE_SPECIAL_CHARS);
    }
  }

  public function __get($atributo)
  {
    return $this->$atributo;
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
      return array('pessoas' => $sql->fetchAll(PDO::FETCH_ASSOC));
    }
    return array('pessoas' => []);
  }

  public static function insere(string $nome, ?int $id = NULL): void
  {
    $sql = Conexao::getConexao()->prepare('INSERT INTO `TESTE_RTE`.`PESSOA` (`ID`, `NOME`) VALUES (NULL, :nome)');
    $sql->bindValue(":nome", self::nome($nome));
    $sql->execute();
  }

  public static function maiorId(): int
  {
    $sql = Conexao::getConexao()->prepare('SELECT MAX(`ID`) `ID` FROM `PESSOA`');
    $sql->execute();
    if ($sql->rowCount() > 0) {
      return $sql->fetchAll(PDO::FETCH_ASSOC)[0]['ID'];
    }
    return 0;
  }

  public static function apaga(){
    $sql = Conexao::getConexao()->prepare('DELETE FROM `FILHO`');
    $sql->execute();
    $sql = Conexao::getConexao()->prepare('DELETE FROM `PESSOA`');
    $sql->execute();
  }

  protected static function nome(string $nome): string
  {
    return filter_var(trim($nome), FILTER_SANITIZE_SPECIAL_CHARS);
  }
}
