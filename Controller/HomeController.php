<?php

namespace Controller;

use Core\Controller;
use Models\ManipulaJson;
use Models\ProcessaJson;

class HomeController extends Controller
{

  public function index(): void
  {
    $this->carregarTemplate('home/home', ManipulaJson::criaJson());
  }

  public function json(): void
  {
    header("Content-type:application/json");
    echo json_encode(ManipulaJson::criaJson());
  }

  public function gravarObj(): void
  {
    ProcessaJson::grava();
    exit;
  }

}
