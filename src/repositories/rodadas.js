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

module.exports = { obterRodadas };
