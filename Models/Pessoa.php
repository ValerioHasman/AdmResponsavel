<?php

namespace Models;

use PDO;

class Pessoa {
  
  protected ?int $id;
  protected string $nome;

  public function __construct () {}

  public function __set($atributo, $value): void
  {
      if ($atributo == 'id'){
          $this->$atributo = (int) $value;
      }
      if ($atributo == 'nome'){
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
    if($sql->rowCount() > 0){
        return array('pessoas' => $sql->fetchAll(PDO::FETCH_ASSOC) );
    }
    return array('pessoas' => []);

  }
  

}

/*
SELECT
`P`.`ID` `ID_PESSOA`,
`F`.`ID` `ID_FILHO`,
`P`.`NOME` `NOME_PESSOA`,
`F`.`NOME` `NOME_FILHO`
FROM `PESSOA` P
LEFT JOIN `FILHO` F ON(P.ID = F.PESSOA_ID)
*/