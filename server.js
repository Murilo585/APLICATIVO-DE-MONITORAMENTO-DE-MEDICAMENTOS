const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "5855",
    database: "aplicativo_medicamentos"
});

app.get("/api/medicamentos", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM medicamentos WHERE usuario_id = 1 ORDER BY horario"
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar medicamentos" });
    }
});

app.post("/api/medicamentos", async (req, res) => {
    try {
        const { nome_medicamento, dosagem, horario, observacoes } = req.body;

        const [result] = await db.query(
            `INSERT INTO medicamentos
            (nome_medicamento, dosagem, horario, observacoes, usuario_id)
            VALUES (?, ?, ?, ?, 1)`,
            [nome_medicamento, dosagem, horario, observacoes || null]
        );

        res.json({
            id: result.insertId,
            mensagem: "Medicamento cadastrado com sucesso"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar medicamento" });
    }
});

app.delete("/api/medicamentos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM medicamentos WHERE id = ? AND usuario_id = 1",
            [id]
        );

        res.json({ mensagem: "Medicamento excluído com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao excluir medicamento" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando em http://localhost:${PORT}`);
});
