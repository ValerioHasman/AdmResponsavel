<?php

namespace Controller;

use Core\Controller;
use Models\Usuario;

class HomeController extends Controller
{

    public function index(): void
    {
        $this->carregarTemplate('home/home', array());
    }
}
