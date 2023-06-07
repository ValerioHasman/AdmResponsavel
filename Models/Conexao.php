<?php

namespace Models;

use PDO;
use Exception;
use mysqli;

class Conexao
{

    private static PDO $instancia;

    private function __construct(){}

    public static function getConexao(): PDO{
        if(!isset(self::$instancia)){
            $dbname = 'ADMINISTRACAO';
            $host = 'localhost';
            $user = 'root';
            $senha = '';

            try {
                self::$instancia = new PDO('mysql:dbname='.$dbname.';host='.$host,$user,$senha);
            } catch (Exception $e) {
                $criaBanco = new mysqli($host, $user, '', '');
                $criaBanco->set_charset('utf8');

                $criaBanco->query("CREATE DATABASE IF NOT EXISTS `ADMINISTRACAO`
                DEFAULT CHARACTER SET UTF8
                DEFAULT COLLATE UTF8_GENERAL_CI");
                $criaBanco->query("CREATE TABLE IF NOT EXISTS `ADMINISTRACAO`.`PESSOA` (
                    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    `NOME` VARCHAR(255) NOT NULL
                  ) ENGINE=INNODB DEFAULT CHARSET=UTF8");
                $criaBanco->query("CREATE TABLE IF NOT EXISTS `ADMINISTRACAO`.`FILHO` (
                    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    `PESSOA_ID` INT NOT NULL,
                    `NOME` VARCHAR(255) NOT NULL,
                    INDEX `FK_PESSOA_FILHO` (`PESSOA_ID`),
                    CONSTRAINT `FK_PESSOA_FILHO` FOREIGN KEY (`PESSOA_ID`) REFERENCES `PESSOA` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
                  ) ENGINE=INNODB DEFAULT CHARSET=UTF8");
                $criaBanco->query("INSERT INTO `ADMINISTRACAO`.`PESSOA` (`ID`, `NOME`) VALUES
                (NULL, 'Fernado Berg Taylor'),
                (NULL, 'Maria Fernandez Bray'),
                (NULL, 'Pedro Holland Schroeder'),
                (NULL, 'Camila Pierce Cline')");
                $criaBanco->query("INSERT INTO `ADMINISTRACAO`.`FILHO` (`ID`, `PESSOA_ID`, `NOME`) VALUES
                (NULL, '1', 'Mariana Berg Taylor'),
                (NULL, '1', 'Agnaldo Berg Taylor'),
                (NULL, '2', 'Lucas Fernandez Bray'),
                (NULL, '2', 'Pedro Fernandez Bray'),
                (NULL, '3', 'Carlos Holland Schroeder'),
                (NULL, '3', 'Regina Holland Schroeder'),
                (NULL, '4', 'João Pierce Cline'),
                (NULL, '4', 'Ana Pierce Cline')");

                self::$instancia = new PDO('mysql:dbname='.$dbname.';host='.$host,$user,$senha);
            }
        }
        return self::$instancia;
    }
}
