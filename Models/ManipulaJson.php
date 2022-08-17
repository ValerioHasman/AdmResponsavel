<?php

namespace Models;

use PDO;

abstract class ManipulaJson
{

  private function __construct()
  {
  }

  public static function criaJson(): array
  {
    $pessoas = Pessoa::pegarPessoas();
    $filhos = Filho::pegarPessoas();

    foreach ($pessoas['pessoas'] as $pessoa => $pes) {
      $pessoas['pessoas'][$pessoa]['filhos'] = [];
      foreach ($filhos['filho'] as $filho => $fil) {
        if ($pessoas['pessoas'][$pessoa]['id'] == $filhos['filho'][$filho]['id']) {
          array_push($pessoas['pessoas'][$pessoa]['filhos'], $filhos['filho'][$filho]['nome']);
        }
      }
      unset($pessoas['pessoas'][$pessoa]['id']);
    }

    return $pessoas;
  }

  public static function grava(): void
  {

    $jonson = json_decode(file_get_contents('php://input'), true) ?? false;

    if ($jonson != false) {
      Pessoa::apaga();
      foreach ($jonson["pessoas"] as $pessoa) {
        Pessoa::insere($pessoa['nome']);
        $id = Pessoa::maiorId();
        foreach ($pessoa['filhos'] as $filho) {
          Filho::insere($filho, $id);
        }
      }
    }
  }
}
