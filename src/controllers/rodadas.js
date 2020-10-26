const Rodadas = require('../repositories/rodadas');
const response = require('./response');

const obterRodadas = async (ctx) => {
	const { rodada = null } = ctx.params;

	if (rodada) {
		const result = await Rodadas.obterRodadas(rodada);
		if (result) {
			return response(ctx, 200, result);
		}
		console.log('algo deu errado ;d ');
		return response(ctx, 404, { menssege: 'Rodada invalida' });
	}
	return response(ctx, 400, { messege: 'pedido mal formatado' });
};

module.exports = obterRodadas;
