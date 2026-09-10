/*laço mais forte, unica tabela independente*/
CREATE TABLE IF NOT EXISTS plataformas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

/*laço medio, liga plataforma e avaliacoes*/
CREATE TABLE IF NOT EXISTS jogos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE   ,
    data_lancamento DATE NOT NULL,
    plataforma_id INTEGER NOT NULL,
    FOREIGN KEY (plataforma_id) REFERENCES plataformas(id) ON DELETE CASCADE,
    CHECK (
        data_lancamento >= '1958-10-30'
        AND data_lancamento <= '2026-08-27'
    )
);

/*laço mais fraco, dependente de jogos que eh dependente de plataforma*/
CREATE TABLE IF NOT EXISTS avaliacoes (
    id SERIAL PRIMARY KEY,
    texto_avaliacao VARCHAR(100) NOT NULL,
    data_avaliacao DATE NOT NULL,
    jogo_id INTEGER NOT NULL,
    FOREIGN KEY (jogo_id) REFERENCES jogos(id),
    CHECK (data_avaliacao <= '2026-08-27')
);

-- 3 inserts em plataformas
INSERT INTO plataformas (nome) VALUES
('PlayStation 5'),
('Xbox Series X'),
('Nintendo Switch');


-- 3 inserts em jogos
INSERT INTO jogos (nome, data_lancamento, plataforma_id) VALUES
('God of War Ragnarök', '2022-11-09', 1),
('Forza Horizon 5', '2021-11-05', 2),
('The Legend of Zelda: Tears of the Kingdom', '2023-05-12', 3);


-- 3 inserts em avaliacoes
INSERT INTO avaliacoes (texto_avaliacao, data_avaliacao, jogo_id) VALUES
('Excelente jogo e ótima história!', '2026-08-20', 1),
('Gráficos incríveis e muita diversão.', '2026-08-21', 2),
('Uma aventura muito bem desenvolvida.', '2026-08-22', 3);

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