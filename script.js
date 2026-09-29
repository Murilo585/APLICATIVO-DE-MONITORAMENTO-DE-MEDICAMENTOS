async function carregarMedicamentos() {
    try {
        const resposta = await fetch("/api/medicamentos");
        const medicamentos = await resposta.json();

        const lista = document.getElementById("listaMedicamentos");

        lista.innerHTML = "";

        medicamentos.forEach(medicamento => {
            adicionarMedicamentoNaTela(medicamento);
        });

    } catch (erro) {
        console.error("Erro ao carregar medicamentos:", erro);
    }
}


function adicionarMedicamentoNaTela(medicamento) {

    const lista = document.getElementById("listaMedicamentos");

    const item = document.createElement("li");

    item.className =
        "list-group-item d-flex justify-content-between align-items-center";

    item.innerHTML = `
        <div>
            <strong>${medicamento.nome_medicamento}</strong><br>

            <small>
                Dosagem: ${medicamento.dosagem}
                | Horário: ${medicamento.horario}
                ${medicamento.observacoes
                    ? ` | ${medicamento.observacoes}`
                    : ""}
            </small>
        </div>

        <div>
            <button
                type="button"
                class="btn btn-danger btn-sm"
                onclick="excluirMedicamento(${medicamento.id}, this)"
            >
                Excluir
            </button>

            <button
                type="button"
                class="btn btn-warning btn-sm"
                onclick="editarMedicamento(${medicamento.id})"
            >
                Editar
            </button>
        </div>
    `;

    lista.appendChild(item);
}


document.getElementById("medForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const dosagem = document.getElementById("dosagem").value.trim();
    const horario = document.getElementById("horario").value;

    try {

        const resposta = await fetch("/api/medicamentos", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome_medicamento: nome,
                dosagem: dosagem,
                horario: horario,
                observacoes: null
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.erro || "Erro ao cadastrar medicamento");
            return;
        }

        alert("Medicamento cadastrado com sucesso!");

        document.getElementById("medForm").reset();

        carregarMedicamentos();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com o servidor.");
    }
});


async function excluirMedicamento(id, botao) {

    if (!confirm("Deseja realmente excluir este medicamento?")) {
        return;
    }

    try {

        const resposta = await fetch(`/api/medicamentos/${id}`, {
            method: "DELETE"
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.erro || "Erro ao excluir medicamento");
            return;
        }

        botao.closest("li").remove();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com o servidor.");
    }
}


async function editarMedicamento(id) {

    try {

        const resposta = await fetch("/api/medicamentos");

        const medicamentos = await resposta.json();

        const medicamento = medicamentos.find(m => m.id === id);

        if (!medicamento) {
            alert("Medicamento não encontrado.");
            return;
        }

        document.getElementById("nome").value =
            medicamento.nome_medicamento;

        document.getElementById("dosagem").value =
            medicamento.dosagem;

        document.getElementById("horario").value =
            medicamento.horario;

        alert("Dados carregados no formulário. Agora você pode editar.");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar o medicamento.");
    }
}


carregarMedicamentos();
