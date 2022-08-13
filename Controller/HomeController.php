<?php

namespace Controller;

use Core\Controller;
use Models\CriaJson;

class HomeController extends Controller
{

    public function index(): void
    {
        $this->carregarTemplate('home/home', CriaJson::criaJson());
    }

    public function json(): void
    {
        header("Content-type:application/json");
        echo json_encode(CriaJson::criaJson());
    }

}
