<?php

spl_autoload_register(function (string $classe) : void {
    require_once( str_replace("\\", DIRECTORY_SEPARATOR, $classe) . '.php');
});
