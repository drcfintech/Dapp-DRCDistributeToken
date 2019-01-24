const log4js = require('log4js');
const logger = log4js.getLogger();
  logger.level = 'info';
  var c = new Date();
  var myDate = new Date();
  var mytime=myDate.toLocaleDateString();
  let sfileName = '../logs/'+'info-'+mytime+'.log';
log4js.configure({
  appenders: {
    out: { type: 'stdout' },//设置是否在控制台打印日志
    info: { type: 'file', filename: sfileName}
  },
  categories: {
    default: { appenders: [ 'out', 'info' ], level: 'info' }//去掉'out'。控制台不打印日志
  }
});

logger.info("adjfasodjfaosdjfo asjdfasdfsdf");
logger.info("adjfasodjfaosdjfo asjdadsdfasdfdadsfadfasdfsdafasdfasdffadfadsfasdf");
logger.info("2222222222222222222222222222222222222222222222222222222222222222");
logger.info("2222222222222222222222222222222222222222222222222222222222222222");
logger.info("2222222222222222222222222222222222222222222222222222222222222222");
logger.info("2222222222222222222222222222222222222222222222222222222222222222");
logger.info("2222222222222222222222222222222222222222222222222222222222222222",mytime);
