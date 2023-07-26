<!DOCTYPE html>
<html lang="pt-br" data-bs-theme="dark">

<head>
    <base href="<?= $GLOBALS['base'] ?>" />
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="formatar/estilohome.css" />
    <link rel="shortcut icon" href="midias/ICONE.ico" type="image/x-icon" />
    <script type="importmap">
    {
      "imports": {
        "@popperjs/core": "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/esm/popper.min.js",
        "bootstrap": "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.esm.min.js"
      }
    }
    </script>
    <script type="module" src="roteiro/roteiro.js"></script>
    <title>Administração de Responsáveis</title>
</head>

<body>
    <?php

    $this->carregarViewNoTemplate($nomeView, $dadosModel);

    ?>
</body>

</html>
