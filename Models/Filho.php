<?php

namespace Models;

use PDO;

class Filho extends Pessoa{

  private int $id_pessoa;

  public function __construct () {}

  public function __set($atributo, $value): void
  {
      if ($atributo == 'id_pessoa' ){
          $this->$atributo = (int) $value;
      }
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
    if($sql->rowCount() > 0){
        return array('filho' => $sql->fetchAll(PDO::FETCH_ASSOC) );
    }
    return array('filho' => []);

  }


}
