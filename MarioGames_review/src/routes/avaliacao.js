const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const r = await db.query(`
      SELECT
        avaliacoes.id,
        avaliacoes.texto_avaliacao,
        avaliacoes.data_avaliacao,
        jogos.nome AS jogo
      FROM avaliacoes
      JOIN jogos ON avaliacoes.jogo_id = jogos.id;`)
    return res.status(200).json(r.rows)
  } catch (error) {
    throw new Error(error)
  }
})

router.post("/", async (req, res) => {
  try {
    //recebendo os valores.
    const { texto_avaliacao, data_avaliacao, jogo_id } = req.body || {};

    //verificando se tem valor vazio
    if (!texto_avaliacao) {
      return res.status(400).json({ msg: "texto de avaliacao vazio" })
    };
    if (!jogo_id) {
      return res.status(400).json({ msg: "id do jogo vazio" })
    };
    if (!data_avaliacao) {
      return res.status(400).json({ msg: "data da avaliacao vazia" })
    };

    //verificando a data de postagem.
    if (data_avaliacao > '2026-08-27') {
      return res.status(400).json({ msg: "data invalida" })
    };

    //testendo se o jogo existe(é a intencao).
    const jogo = await db.query(
      "SELECT * FROM jogos WHERE id = $1", [jogo_id]);
    if (jogo.rowCount == 0) {
      return res.status(400).json({ msg: "jogo nao existe" })
    };
    if (jogo.rows[0].data_lancamento > data_avaliacao) {
      return res.status(400).json({ msg: "data invalida" })
    }


    //colocar a avaliacao.
    const r = await db.query("INSERT INTO avaliacoes (texto_avaliacao, data_avaliacao, jogo_id) VALUES($1, $2, $3) RETURNING *", [texto_avaliacao, data_avaliacao, jogo_id])

    return res.status(200).json({
      msg: "avaliacao adicionada!",
      avaliacao: r.rows[0]
    });
  } catch (error) {
    throw new Error(error);
  };
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id

    // verifica se a avaliação existe
    const v = await db.query(
      "SELECT * FROM avaliacoes WHERE id = $1",
      [id]
    )

    if (v.rowCount == 0) {
      return res.status(404).json({
        msg: "avaliação não encontrada"
      })
    }

    // deleta a avaliação
    const b = await db.query(
      "DELETE FROM avaliacoes WHERE id = $1 RETURNING *",
      [id]
    )

    return res.status(200).json({
      msg: "avaliação deletada!",
      avaliacao: b.rows[0]
    })

  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const v = await db.query(
      "SELECT * FROM avaliacoes WHERE id = $1",
      [id]
    )
    if(v.rowCount == 0){
      return res.status(400).json({ msg: "avaliação não existe" })
    }

    const {texto_avaliacao} = req.body || {};

    if (!texto_avaliacao) {
      return res.status(400).json({ msg: "texto de avaliacao vazio" })
    };

    const b = await db.query("UPDATE avaliacoes SET texto_avaliacao=$1 WHERE id=$2 RETURNING *", [texto_avaliacao,id])
    return res.status(400).json({
      msg:"Avaliação atualizada",
      jogo: b.rows[0]
    })
  } catch (error) {
    throw new Error(error)
  }
})
module.exports = router;