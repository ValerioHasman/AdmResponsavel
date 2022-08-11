<?php

namespace Core;

abstract class Controller
{

    protected function carregarTemplate(string $nomeView, array $dadosModel): void
    {
        require_once 'Views/template/template.php';
    }

    protected function carregarViewNoTemplate(string $nomeView, array $dadosModel): void
    {
        extract($dadosModel);
        require_once 'Views/' . $nomeView . '.php';
    }

}
