const express = require("express");
const router = express.Router();
const db = require("../db");

//pega o jogo
router.get("/", async (req, res) => {
    try {
        const r = await db.query(`
            SELECT 
                jogos.id,
                jogos.nome,
                jogos.data_lancamento,
                jogos.plataforma_id,
                plataformas.nome AS plataforma
            FROM jogos
            JOIN plataformas ON jogos.plataforma_id = plataformas.id;
        `)
        return res.status(200).json(r.rows)
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
})

//pega o jogo pelo id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const r = await db.query(`
            SELECT
                jogos.id,
                jogos.nome,
                jogos.data_lancamento,
                jogos.plataforma_id,
                plataformas.nome AS plataforma
            FROM jogos
            JOIN plataformas ON jogos.plataforma_id = plataformas.id
            WHERE jogos.id = $1;
        `, [id])
        return res.status(200).json(r.rows)
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
})

router.post("/", async (req, res) => {
    try {
        //linha pegando as variaveis
        const { nome, data_lancamento, plataforma_id } = req.body || {};

        //bloco vendo se existe tudo
        if (!nome) {
            return res.status(404).json({ msg: "nome não enviado, não postado!" })
        }
        if (!data_lancamento) {
            return res.status(404).json({ msg: "data de lançamento não enviada, não postado!" })
        }
        if (!plataforma_id) {
            return res.status(404).json({ msg: "id da plataforma não enviado, não postado!" })
        }

        //verificando se eh uma data valida
        if (data_lancamento < '1958-10-30' || data_lancamento > '2026-08-27') {
            return res.status(404).json({ msg: "data de lançamento invalida, deve estar entre 1958-10-30 e 2026-08-27, não postado!" })
        }

        //verifica se plataforma existe
        const verificandoPlataforma = await db.query("SELECT * FROM plataformas WHERE id=$1", [plataforma_id])
        if (verificandoPlataforma.rowCount == 0) {
            return res.status(404).json({ msg: "plataforma não encontrada, não postado!" })
        }

        //inseri o jogo na tabela
        const r = await db.query("INSERT INTO jogos (nome, data_lancamento, plataforma_id) VALUES($1, $2, $3) RETURNING *", [nome, data_lancamento, plataforma_id])
        return res.status(200).json({
            msg: "jogo adicionado!",
            jogo: r.rows[0]
        })
    } catch (error) {
        throw new Error(error)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id

        //verifica se o jogo existe pelo id
        const verificaJogo = await db.query("SELECT * FROM jogos WHERE id=$1", [id])
        if (verificaJogo.rowCount == 0) {
            return res.status(400).json({ msg: "jogo não encontrado" })
        }

        //pegando todas as variaveis
        const { nome, plataforma_id } = req.body || {};

        //bloco vendo se existe tudo
        if (!nome) {
            return res.status(400).json({ msg: "nome não enviado, não alterado!" })
        }

        if (!plataforma_id) {
            return res.status(400).json({ msg: "id da plataforma não enviado, não alterado!" })
        }

        //verifica se plataforma existe
        const verificandoPlataforma = await db.query("SELECT * FROM plataformas WHERE id=$1", [plataforma_id])
        if (verificandoPlataforma.rowCount == 0) {
            return res.status(404).json({ msg: "plataforma não encontrada, não postado!" })
        }

        const b = await db.query("UPDATE jogos SET nome=$1, plataforma_id=$2 WHERE id=$3 RETURNING *", [nome, plataforma_id, id])
        return res.status(200).json({
            msg: "jogo atualizado",
            jogo: b.rows[0]
        })
    } catch (error) {
        throw new Error(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id

        //verifica se o jogo existe
        const v = await db.query("SELECT * FROM jogos WHERE id = $1", [id])
        if (v.rowCount == 0) {
            return res.status(404).json({ msg: "jogo nao encontrado" })
        }

        //deleta ele
        const b = await db.query("DELETE FROM jogos WHERE id = $1 RETURNING *", [id])
        return res.status(200).json({
            msg: "jogo deletado!",
            jogos: b.rows[0],
        })
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

})

module.exports = router;