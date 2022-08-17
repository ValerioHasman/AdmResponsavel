<?php

namespace Controller;

use Core\Controller;
use Models\ManipulaJson;

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

    public function gravar()
    {
        ManipulaJson::grava();
        header('Location: ' . $GLOBALS['base']);
        exit;
    }

}
