const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res)=>{
  try{
    const r = await db.query("SELECT * FROM plataformas;")
    return res.status(200).json(r.rows)
  }catch(error){
    return res.status(400).json({msg: error})
  }
})

router.post("/", async (req, res)=>{
    try{
      const { nome } = req.body || {};
      if(!nome){
        throw new Error("nome nao enviado!")
      }
      const r = await db.query("INSERT INTO plataformas (nome) VALUES($1) RETURNING *", [nome])
      return res.status(200).json({
        msg: "plataforma adicionada!",
        plataforma: r.rows[0]
      })
    }catch(error){
      throw new Error(error)
    }
  })

  router.delete("/:id", async (req, res)=>{
    try{
        const id = req.params.id
        
        const v = await db.query("SELECT id FROM plataformas WHERE id = $1",[id])
        if(v.rowCount == 0){
            return res.status(404).json({msg:"plataforma nao encontrada"})
        }
        const a = await db.query("DELETE FROM jogos WHERE plataforma_id = $1 RETURNING *" , [id])
        const b = await db.query("DELETE FROM plataformas WHERE id = $1 RETURNING *", [id])
        return res.status(200).json({
            msg: "plataformas e jogos da plataforma deletados!",
            jogos: a.rows[0],
            plataforma: b.rows[0]
        })
    }catch(error){
        console.log(error);
        throw new Error(error)
    }

})

module.exports = router;