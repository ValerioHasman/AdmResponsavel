<!DOCTYPE html>
<html lang="pt-br">

<head>
    <base href="<?= $GLOBALS['base'] ?>" />
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="formatar/estilohome.css" />
    <link rel="shortcut icon" href="midias/ICONE.ico" type="image/x-icon" />
    <script defer src="roteiro/roteiro.js"></script>
    <title>TurimRTE</title>
</head>

<body>
    <?php

    $this->carregarViewNoTemplate($nomeView, $dadosModel);

    ?>
</body>

</html>
