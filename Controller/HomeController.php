<?php

namespace Controller;

use Core\Controller;

class HomeController extends Controller
{

    public function index(): void
    {
        $this->carregarTemplate('home/home', array());
    }
}
