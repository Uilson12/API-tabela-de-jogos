const Autentica = require('../repositories/auth');
const response = require('./response');
const Password = require('../utils/password');
const jwt = require('jsonwebtoken');

const autenticar = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;
	if (!email || !senha) {
		return response(ctx, 400, { mensagem: 'Requisição mal formulada' });
	}
	const emailCad = await Autentica(email);
	console.log(emailCad.senha);
	if (emailCad) {
		console.log('antes do erro');
		const comparacao = await Password.check(senha, emailCad.senha);
		console.log('depois do erro');
		if (comparacao) {
			const token = await jwt.sign(
				{ email: emailCad.email },
				process.env.SECRET || 'desafioBack',
				{
					expiresIn: '1000000',
				}
			);
			return response(ctx, 200, { token });
		}
	}
};

module.exports = autenticar;
