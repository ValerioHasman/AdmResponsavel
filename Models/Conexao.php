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
            $dbname = 'TESTE_RTE';
            $host = 'localhost';
            $user = 'root';
            $senha = '';

            try {
                self::$instancia = new PDO('mysql:dbname='.$dbname.';host='.$host,$user,$senha);
            } catch (Exception $e) {
                $criaBanco = new mysqli($host, $user, '', '');
                $criaBanco->set_charset('utf8');

                $criaBanco->query("CREATE DATABASE IF NOT EXISTS `TESTE_RTE`
                DEFAULT CHARACTER SET UTF8
                DEFAULT COLLATE UTF8_GENERAL_CI");
                $criaBanco->query("CREATE TABLE IF NOT EXISTS `TESTE_RTE`.`PESSOA` (
                    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    `NOME` VARCHAR(255) NOT NULL
                  ) ENGINE=INNODB DEFAULT CHARSET=UTF8");
                $criaBanco->query("CREATE TABLE IF NOT EXISTS `TESTE_RTE`.`FILHO` (
                    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    `PESSOA_ID` INT NOT NULL,
                    `NOME` VARCHAR(255) NOT NULL,
                    INDEX `FK_PESSOA_FILHO` (`PESSOA_ID`),
                    CONSTRAINT `FK_PESSOA_FILHO` FOREIGN KEY (`PESSOA_ID`) REFERENCES `PESSOA` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
                  ) ENGINE=INNODB DEFAULT CHARSET=UTF8");
                $criaBanco->query("INSERT INTO `TESTE_RTE`.`PESSOA` (`ID`, `NOME`) VALUES
                (NULL, 'Pedro'),
                (NULL, 'Maria'),
                (NULL, 'Marcos'),
                (NULL, 'Felipe')");
                $criaBanco->query("INSERT INTO `TESTE_RTE`.`FILHO` (`ID`, `PESSOA_ID`, `NOME`) VALUES
                (NULL, '1', 'Rogerio'),
                (NULL, '1', 'Ricardo'),
                (NULL, '2', 'Valério'),
                (NULL, '2', 'Marta'),
                (NULL, '3', 'Carlos'),
                (NULL, '3', 'Lucas'),
                (NULL, '4', 'Ana'),
                (NULL, '4', 'José')");

                self::$instancia = new PDO('mysql:dbname='.$dbname.';host='.$host,$user,$senha);
            }
        }
        return self::$instancia;
    }
}
