const classificacao = require('../repositories/classificacao');
const response = require('./response');
const tabela = [];
const jogos = [];

const formandoTabela = (time, pontos, golsC, golsV) => {
	let encontrado = false;
	tabela.forEach((timeTabela) => {
		if (timeTabela.time === time) {
			timeTabela.jogos++;
			timeTabela.gp += golsC;
			timeTabela.gs += golsV;
			timeTabela.sg = timeTabela.gp - timeTabela.gs;
			timeTabela.pontos += pontos;
			encontrado = true;
			if (pontos === 3) {
				timeTabela.vitorias++;
			} else if (pontos === 1) {
				timeTabela.empates++;
			} else {
				timeTabela.derrota++;
			}
		}
	});
	if (!encontrado) {
		tabela.push({
			time: time,
			jogos: 1,
			pontos: pontos,
			vitorias: 0,
			derrota: 0,
			empates: 0,
			gp: golsC,
			gs: golsV,
			sg: golsC - golsV,
		});
	}
};

const obterClass = async (ctx) => {
	const result = await classificacao.obterClas();

	const jogos = result.map((x) => {
		return {
			timeA: x.time_casa,
			timeB: x.time_visitante,
			golsA: x.gols_casa,
			golsB: x.gols_visitante,
		};
	});
	jogos.forEach((jogo) => {
		if (jogo.golsA === jogo.golsB) {
			formandoTabela(jogo.timeA, 1, jogo.golsA, jogo.golsB);
			formandoTabela(jogo.timeB, 1, jogo.golsB, jogo.golsA);
		} else if (jogo.golsA > jogo.golsB) {
			formandoTabela(jogo.timeA, 3, jogo.golsA, jogo.golsB);
			formandoTabela(jogo.timeB, 0, jogo.golsB, jogo.golsA);
		} else {
			formandoTabela(jogo.timeA, 0, jogo.golsA, jogo.golsB);
			formandoTabela(jogo.timeB, 3, jogo.golsB, jogo.golsA);
		}
	});
	const tabelaOrdenada = tabela.sort((a, b) => {
		if (a.pontos > b.pontos) {
			return -1;
		} else if (a.pontos < b.pontos) {
			return 1;
		} else {
			if (a.vitorias > b.vitorias) {
				return -1;
			} else if (b.vitorias > a.vitorias) {
				return 1;
			} else {
				if (a.sg > b.sg) {
					return -1;
				} else if (b.sg > a.sg) {
					return 1;
				} else {
					if (a.gp > b.gp) {
						return -1;
					} else if (b.gp > a.gp) {
						return 1;
					} else {
						a.time.localeCompare(b.time);
					}
				}
			}
		}
	});

	return response(ctx, 200, tabelaOrdenada);
};

module.exports = obterClass;
