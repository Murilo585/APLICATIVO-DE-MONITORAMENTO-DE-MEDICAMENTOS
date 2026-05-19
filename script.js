<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Medicamentos</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container mt-5">
        <h1 class="text-center mb-4">Controle de Medicamentos</h1>

        <form id="medForm" class="card p-4 shadow">

            <div class="mb-3">
                <label class="form-label">Nome do Medicamento</label>
                <input type="text" id="nome" class="form-control" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Dosagem</label>
                <input type="text" id="dosagem" class="form-control" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Horário</label>
                <input type="time" id="horario" class="form-control" required>
            </div>

            <button type="submit" class="btn btn-primary">
                Adicionar
            </button>

        </form>

        <ul id="listaMedicamentos" class="list-group mt-4"></ul>
    </div>

    <script src="script.js"></script>
</body>
</html>