document.getElementById("medForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const dosagem = document.getElementById("dosagem").value.trim();
    const horario = document.getElementById("horario").value;

    const lista = document.getElementById("listaMedicamentos");

    const item = document.createElement("li");

    item.className = "list-group-item d-flex justify-content-between align-items-center";

    item.innerHTML = `
        <div>
            <strong>${nome}</strong><br>
            <small>Dosagem: ${dosagem} | Horário: ${horario}</small>
        </div>

        <button type="button" class="btn btn-danger btn-sm">
            Excluir
        </button>
    `;

    const botaoExcluir = item.querySelector("button");

    botaoExcluir.addEventListener("click", function () {
        item.remove();
    });

    lista.appendChild(item);

    document.getElementById("medForm").reset();
});
