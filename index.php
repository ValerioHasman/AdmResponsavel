<?php

session_start();

require_once("./autoload.php");

use Core\Core;

$GLOBALS['base'] = rtrim($_SERVER['SCRIPT_NAME'],'index.php');

$GLOBALS['caminho'] = rtrim($_SERVER['SCRIPT_FILENAME'],'index.php');

$c = new Core();
