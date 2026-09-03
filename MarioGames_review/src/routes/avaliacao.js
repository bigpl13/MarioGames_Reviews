const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/", async (req, res)=>{
  try{
    const r = await db.query("SELECT * FROM avaliacoes;")
    return res.status(200).json(r.rows)
  }catch(error){
    return res.status(400).json({msg: error})
  }
})

router.post("/", async (req, res)=>{
    try{
      //recebendo os valores
      const { avaliacao, data_avaliacao, jogo_id } = req.body || {};

      //verificando se tem valor invalido ou vazio
      if(!avaliacao || !data_avaliacao || !jogo_id){
        throw new Error("valor invalido ou vazio, nao enviado!")
      };

      //verificando a data de postagem
      if (data_avaliacao > '2026-08-27') {
        throw new Error("data invalida, nao enviado!")
      };

      //testendo se o jogo existe(é a intencao)
      const jogo = await db.query(
        "SELECT * FROM jogos WHERE id = $1",
        [jogo_id]
      );
      if (jogo.rows.length === 0) {
        throw new Error("Jogo nao existente!");
      };

      //colocar a avaliacao
      const r = await db.query("INSERT INTO avaliacoes (avaliacao, data_avaliacao, jogo_id) VALUES($1, $2, $3) RETURNING *", [avaliacao, data_avaliacao, jogo_id])
      
      return res.status(200).json({
        msg: "avaliacao adicionada!",
        avaliacao: r.rows[0]
      });
    }catch(error){
      throw new Error(error)
    };
  });

module.exports = router;