//首页的4个Tab入口
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/index');

const express = require('express');

const mdb = require('../mongoose');
const redis = require('promise-redis')();

const redisClient = redis.createClient(config.redis);

const router = express.Router();

const checkManager = async (req) => {
  // const m = await mdb.Admin.findById(req.$token);
  // if (m.role !== 'super_admin') {
  //   throw new Error('auth err');
  // }
};

router.post('/log', (req, res) => {
  res.end();
});

/**
#保存用户信息
POST http://localhost:3001/mp/token_login
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
*/
router.post('/token_login', async (req, res, next) => {
  const admin = await mdb.Admin.findById(req.$token);
  logger.info(admin);
  redisClient.setex(admin._id, 30 * 60 * 60 * 24, JSON.stringify(admin));
  res.json({
    success: true,
    admin,
  });
});

/**
# scan qrcode
GET http://localhost:3001/mp/socket/jz0ebV8nGkiYicV6AAAV
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
*/
router.get('/socket/:socket', async (req, res, next) => {
  // check manager
  await checkManager(req);

  try {
    const { socket } = req.params;

    const admin = await mdb.Admin.findById(req.$token);
    req.app.emit('res_login_scan_token', socket, req.$token, admin);
    return res.json({
      success: true,
      msg: '登录成功',
    });
  } catch (err) {
    logger.error(err);
    return res.render('result', {
      success: false,
      msg: '用户登录出错',
    });
  }
});

/**
# dictionary data
GET http://localhost:3001/mp/dictionary
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
*/
router.get('/dictionary', async (req, res, next) => {
  // check manager
  await checkManager(req);

  try {
    return res.json({
      success: true,
      planCategories: await mdb.Plan.find().distinct('category'),
      adminCategories: await mdb.Admin.find().distinct('category'),
    });
  } catch (err) {
    logger.error(err);
    return res.render('result', {
      success: false,
      msg: '用户登录出错',
    });
  }
});

module.exports = router;
