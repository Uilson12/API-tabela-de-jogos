const Router = require('koa-router');
const rodadas = require('./controllers/rodadas');
const classificacao = require('./controllers/classificacao');
const autenticacao = require('./controllers/auth');
const Session = require('./middleware/session');
const router = new Router();

router.get('/jogos/:rodada', rodadas);
router.get('/classificacao', Session, classificacao);
router.post('/auth', autenticacao);

module.exports = router;
