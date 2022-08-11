<?php

namespace Core;

use Models\CadastroUsuarios;
use Models\Usuario;

abstract class Controller
{

    protected array $modalOnLoad;

    protected function carregarTemplate(string $nomeView, array $dadosModel): void
    {
        require_once 'Views/template/template.php';
    }

    protected function carregarTemplateDoSistema(string $nomeView, array $dadosModel): void
    {
        require_once 'Views/template/templateDoSistema.php';
    }

    protected function carregarViewNoTemplate(string $nomeView, array $dadosModel): void
    {
        extract($dadosModel);
        require_once 'Views/' . $nomeView . '.php';
    }

    protected function sessaoLigada(): void
    {
        if (!empty($_SESSION['USU_ID'])) {
            header('Location: ' . $GLOBALS["base"] . 'sistema/index');
            exit;
        }
    }
    protected function sessaoDesligada(): void
    {
        if (empty($_SESSION['USU_ID'])) {
            header('Location: ' . $GLOBALS["base"] . 'home/index');
            exit;
        }
    }

    protected function logar(array $post)
    {
        $usuario = new Usuario();
        $usuario->login = $post['login'];
        $usuario->senha = $post['senha'];
        $usuario->logar();
    }

    protected function cadastrar($post): void
    {
        if(
            isset($post)
            & !empty($post['nome'])
            & !empty($post['email'])
            & !empty($post['senha'])
            & !empty($post['perfil'])
            ){
            $cadastrar = new CadastroUsuarios();
            $cadastrar->nome = $post['nome'];
            $cadastrar->email = $post['email'];
            $cadastrar->senha = $post['senha'];
            $cadastrar->perfil = $post['perfil'];
            $cadastrar->inserirNoBanco();    
        }
    }
    protected function atualizar($post): string
    {
        if(
            isset($post)
            & !empty($post['id'])
            & !empty($post['nome'])
            & !empty($post['email'])
            & !empty($post['senha'])
            & !empty($post['perfil'])
            ){
            $cadastrar = new CadastroUsuarios();
            $cadastrar->id = $post['id'];
            $cadastrar->nome = $post['nome'];
            $cadastrar->email = $post['email'];
            $cadastrar->senha = $post['senha'];
            $cadastrar->perfil = $post['perfil'];
            $cadastrar->atualizaNoBanco();

            return '<div class="modal fade" id="atualizado" tabindex="-1" aria-labelledby="atualizadoLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title fw-bolder" id="atualizadoLabel">Usuário Atualizado</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p>Usuário atualizado com sucesso!</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
              </div>
            </div>
          </div>
          <script>
          window.onload = function(){
              (new bootstrap.Modal($("#atualizado"), { keyboard: false })).show();
          }
          </script>';
        }
        return '';
    }

    protected function apagar($post): string
    {
        if(
            isset($post)
            & !empty($post['id'])
            ){
            $cadastrar = new CadastroUsuarios();
            $cadastrar->id = $post['id'];
            $cadastrar->apagaNoBanco();

            return '<div class="modal fade" id="deletado" tabindex="-1" aria-labelledby="deletadoLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title fw-bolder" id="deletadoLabel">Usuário Removido</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <p>Usuário removido com sucesso!</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                  </div>
                </div>
              </div>
            </div>
            <script>
            window.onload = function(){
                (new bootstrap.Modal($("#deletado"), { keyboard: false })).show();
            }
            </script>';        
        }
        return '';
    }

}
