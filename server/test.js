<<<<<<< HEAD
const func_getTxmessage=(data)=>{
//
let p = new Promise((resolve,reject)=>{
  console.log("dfsf ",data);

  if(data==10){
    resolve("resolve");
  }else{
    reject("err");
  }
});
return p;
};
let a =10;
func_getTxmessage(a).then((re)=>{
  console.log("---",re);
},(dater)=>{
  console.log("-----------err",dater);
});

// const log4js = require('log4js');
//     const logger = log4js.getLogger();
//     logger.level = 'info';
//     log4js.configure({
//       appenders: {
//         out: { type: 'stdout' },//设置是否在控制台打印日志
//         info: { type: 'file', filename: '../logs/info.log' }
//       },
//       categories: {
//         default: { appenders: [ 'out', 'info' ], level: 'info' }//去掉'out'。控制台不打印日志
//       }
//     });
// logger.info("111111111111111");
//
// var schedule = require('node-schedule');
// var rule = new schedule.RecurrenceRule();
// let i =1;
// rule.second = [0,10,20,30,40,50];
//
//  let j = schedule.scheduleJob(rule, function(){
//  i++;
//  console.log('现在时间：',new Date(),i);
//  if(i ==5){
//    j.cancel();
//  }
// });

// let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
// let brr = [];
// let cData = [];
// for (let i = 0;i<arr.length;i++){
//   if (i%3==0&& i!=0){
//     console.log("第",i,"次填充");
//     brr.push(cData);
//     //
//     cData = [];
//   }
//   cData.push(arr[i]);
//   console.log("arr",arr.length);
//   if (i==arr.length-1){
//     brr.push(cData);
//     //
//     cData = [];
// console.log("最后填充");
//
//   }
//   //
//
// }
// //
// console.log("------------",brr);
=======
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
>>>>>>> eb4a3b98ef5ffb52c4016c6c18cda0844236d13a

logger.info("adjfasodjfaosdjfo asjdfasdfsdf");
logger.info("adjfasodjfaosdjfo asjdadsdfasdfdadsfadfasdfsdafasdfasdffadfadsfasdf");
logger.info("2222222222222222222222222222222222222222222222222222222222222222");
logger.info("2222222222222222222222222222222222222222222222222222222222222222");
logger.info("2222222222222222222222222222222222222222222222222222222222222222");
logger.info("2222222222222222222222222222222222222222222222222222222222222222");
logger.info("2222222222222222222222222222222222222222222222222222222222222222",mytime);
