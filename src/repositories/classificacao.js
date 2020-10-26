const database = require('../utils/database');

const obterClas = async (id = null) => {
	const query = `SELECT * FROM jogos`;
	const resultado = await database.query({
		text: query,
	});

	return resultado.rows;
};

module.exports = { obterClas };
