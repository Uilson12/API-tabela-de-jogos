const database = require('../utils/database');

const obterRodadas = async (rodada = null) => {
	if (!rodada) {
		return null;
	}
	const query = `SELECT * FROM jogos WHERE rodada = $1`;
	const resultado = await database.query({
		text: query,
		values: [rodada],
	});
	return resultado;
};

const editarJogos = async (jogo) => {
	const { id, golsCasa, golsVisitante } = jogo;
	console.log(id, golsCasa, golsVisitante);
	const query = {
		text: `UPDATE jogos SET 
	gols_casa = $1,
	gols_visitante = $2
	WHERE id = $3
	RETURNING *`,
		values: [golsCasa, golsVisitante, id],
	};
	const result = await database.query(query);
	return result.rows.shift();
};

module.exports = { obterRodadas, editarJogos };
