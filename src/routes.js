const Router = require('koa-router');
const rodadas = require('./controllers/rodadas');
const classificacao = require('./controllers/classificacao');
const edit = require('./controllers/editRodadas');
const autenticacao = require('./controllers/auth');
const Session = require('./middleware/session');
const router = new Router();

router.get('/jogos/:rodada', rodadas);
router.get('/classificacao', classificacao);
router.post('/auth', autenticacao);
router.post('/jogos', Session, edit);

module.exports = router;
