<?php

namespace Models;

abstract class ProcessaJson
{

  private function __construct()
  {
  }

  public static function grava(): void
  {

    $jonson = json_decode(file_get_contents('php://input'), true) ?? false;

    if ($jonson != false) {
      Pessoas::apagaNoBanco();
      foreach ($jonson["pessoas"] as $pessoa) {
        $pessoas = new Pessoas();
        $pessoas->nome = $pessoa['nome'];
        $pessoas->insereNoBanco();
        foreach ($pessoa['filhos'] as $filho) {
          $filhos = new Filhos();
          $filhos->id = $pessoas->id;
          $filhos->nome = $filho;
          $filhos->insereNoBanco();
        }
      }
    }
  }
}
