// 微信优惠券
const config = require('../config');
const logger = require('../lib/logging').getLogger('lib/qrcode');

const curl = require('curlrequest');
const path = require('path');
const fs = require('fs');
const nwApi = require('node-weixin-api');

const gm = require('gm').subClass({
  imageMagick: true,
});

const nwl = nwApi.link;

//
module.exports = class QRCode {
  shorten(setting, url) {
    return new Promise((resolve, reject) => {
      nwl.url.shorten(setting, config.app, url, (error, json) => {
        if (error) {
          logger.error(error, json);
          reject(error);
        } else {
          resolve(json.short_url);
        }
      });
    });
  }

  temporaryQrcode(setting, app, param) {
    return new Promise((resolve, reject) => {
      nwl.qrcode.temporary.createString(setting, app, param, (err, json) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          const qr_url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${json.ticket}`;
          resolve(qr_url);
        }
      });
    });
  }

  permanentQrcode(setting, app, param) {
    return new Promise((resolve, reject) => {
      nwl.qrcode.permanent.createString(setting, app, param, (err, json) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          const qr_url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${json.ticket}`;
          logger.info('qrcode.permanent url: %s', qr_url);
          const output = path.join(config.tmpdir, `${param}_qr.jpg`);

          curl.request({
            url: qr_url,
            encoding: null,
          }, (e1, data) => {
            if (e1) {
              reject(e1);
              return;
            }
            fs.writeFile(output, data, (e2) => {
              if (e2) {
                reject(e2);
                return;
              }
              logger.debug('saved: ', output);
              resolve(output);
            });
          });
        }
      });
    });
  }

  genPoster(src, nickname, portrait) {
    const qr = path.basename(src);
    const resized_qr = path.join(config.tmpdir, `234_${qr}`);
    const composited_qr = path.join(config.tmpdir, `composited_${qr}`);
    const composited_logo = path.join(config.tmpdir, `composited_logo_${qr}`);
    const logo = path.join(__dirname, 'logo.jpeg');
    const dest_font = path.join(config.tmpdir, `final_${qr}`);
    const dest = path.join(config.tmpdir, `final_${qr}`);
    const pf = path.join(config.tmpdir, `portrait_${qr}`);

    return new Promise((resolve, reject) => {
      // qrcode尺寸
      gm(src).resize(234, 234).write(resized_qr, (err) => {
        if (err) {
          reject(err);
          return;
        }
        // 合并qrcode
        gm(path.join(__dirname, 'post_template.jpg')).composite(resized_qr).geometry('+48+1022').write(composited_qr, (e1) => {
          if (e1) {
            reject(e1);
            return;
          }
          gm(composited_qr).composite(logo).geometry('+141+1115').write(composited_logo, (e2) => {
            if (e2) {
              reject(e2);
              return;
            }
            gm(composited_logo).font(path.join(__dirname, 'Lantinghei.ttc'), 35).fill('#f6ab00').drawText(180, 200, nickname)
              .write(dest_font, (e3) => {
                if (e3) {
                  reject(e3);
                  return;
                }
                curl.request({
                  url: portrait,
                  encoding: null,
                }, (e4, data) => {
                  if (e4) {
                    reject(e4);
                    return;
                  }
                  fs.writeFile(pf, data, (e5) => {
                    if (e5) {
                      reject(e5);
                      return;
                    }
                    logger.debug('saved: ', pf);
                    gm(pf).resize(96, 96).write(pf, (e6) => {
                      if (e6) {
                        reject(e6);
                        return;
                      }
                      gm(dest_font).composite(pf).geometry('+96+48').write(dest, (e7) => {
                        if (e7) {
                          reject(e7);
                          return;
                        }
                        resolve(dest);
                      });
                    });
                  });
                });
              });
          });
        });
      });
    });
  }
};
