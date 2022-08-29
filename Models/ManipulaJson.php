<?php

namespace Models;

abstract class ManipulaJson
{

  private function __construct()
  {
  }

  public static function criaJson(): array
  {
    $pessoas = Pessoas::pegarPessoas();
    $filhos = Filhos::pegarPessoas();

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
}
