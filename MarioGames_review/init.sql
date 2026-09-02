/*laço mais forte, unica tabela independente*/
CREATE TABLE IF NOT EXISTS plataformas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

/*laço medio, liga plataforma e avaliacoes*/
CREATE TABLE IF NOT EXISTS jogos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_lancamento DATE NOT NULL,
    plataforma_id INTEGER NOT NULL,
    FOREIGN KEY (plataforma_id) REFERENCES plataformas(id),
    CHECK (
        data_lancamento >= '1958-10-30'
        AND data_lancamento <= '2026-08-27'
    )
);

/*laço mais fraco, dependente de jogos que eh dependente de plataforma*/
CREATE TABLE IF NOT EXISTS avaliacoes (
    id SERIAL PRIMARY KEY,
    avaliacao VARCHAR(100) NOT NULL,
    data_avaliacao DATE NOT NULL,
    jogo_id INTEGER NOT NULL,
    FOREIGN KEY (jogo_id) REFERENCES jogos(id),
    CHECK (data_avaliacao <= '2026-08-27')
);


/*porque exite esses selects aqui? esse tipo de consulta eh realizada pelo js nao? ass: iudy*/
/*
SELECT *
FROM jogos
WHERE data_lancamento BETWEEN '1958-10-30' AND '2026-08-27'
LIMIT 10;

SELECT a.*
FROM avaliacoes a
JOIN jogos j ON a.jogo_id = j.id
WHERE a.data_avaliacao > j.data_lancamento
  AND a.data_avaliacao <= '2026-08-27'
LIMIT 10;
*/