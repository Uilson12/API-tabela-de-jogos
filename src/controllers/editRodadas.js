const rodadas = require('../repositories/rodadas');
const response = require('./response');

const editarRodadas = async (ctx) => {
	const { id, golsCasa, golsVisitante } = ctx.request.body;
	if (!id || !golsCasa || !golsVisitante) {
		return response(ctx, 404, 'Requisição mal formulada');
	}
	const jogo = {
		id: id,
		golsCasa: golsCasa,
		golsVisitante: golsVisitante,
	};
	console.log(jogo);
	const result = await rodadas.editarJogos(jogo);
	return response(ctx, 200, result);
};

module.exports = editarRodadas;
