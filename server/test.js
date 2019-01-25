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

//
//  let a  = false;
//  if (a){
// console.log("adf");
// }else{
// console.log("dddddddddddddddddddddddd");
//
// }
// router_get: () => {
//   //首页
//   router.get('/', (ctx, next) => {
//     // TODO:
//     ctx.body = "测试路由";
//   });
//   //测试页面
//   router.get('/test', async (ctx, next) => {
//     // TODO:
//     ctx.body = "测试路由";
//     // TODO:
//     let list = {
//       name: '张三',
//       num: 20
//     }
//     await ctx.render('exct', {
//       list: list
//     });
//   });
//   /**
//   代币测试
//   */
//
//   /**
//  * @get{方式发起 代币合约的transferFrom交易}
//  * @method {transferFrom}
//  * @for {NodeList}
//  * @param {address from,address to, uint256 value}
//  * @return {hash}
//  */
//   router.get('/Token/T_transferFrom', (ctx, next) => {
//     // TODO:校验数据
//     let sFrom = Json_list.ADDRESS_TOKEN;
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.T_transferFrom({
//         from: data,
//         to: data,
//         value: data
//       });
//       console.log("1111=>", result);
//       return result;
//     }
//     //结果返回
//     deploy(sFrom).then(res => {
//       ctx.body = "调用tranfer结果是=>" + res;
//     });
//   });
//
//   /**
//  * @get{方式发起 代币合约的transfer交易}
//  * @method {transfer}
//  * @for {routerList}
//  * @param {address to,uint256 value}
//  * @return {hash}
//  */
//   router.get('/Token/T_transfer', (ctx, next) => {
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.T_transfer({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {
//       ctx.body = "调用tranfer结果是=>" + res;
//     });
//   });
//
//   /**
//  * @get{方式发起 代币合约的balanceOf交易}
//  * @method {balanceOf}
//  * @for {routerList}
//  * @param {address owner}
//  * @return {hash}
//  */
//   router.get('/Token/T_balanceOf', (ctx, next) => {
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.T_balanceOf({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {
//       ctx.body = "调用T_balanceOf结果是=>" + res;
//     });
//   });
//
//   /**
//  * @get{方式发起 代币合约的approv交易}
//  * @method {approve}
//  * @for {routerList}
//  * @param {address spender,uint256 value}
//  * @return {hash}
//  */
//   router.get('/Token/T_approve', (ctx, next) => {
//     // TODO:
//     ctx.body = "T_approve"; //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.T_approve({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {
//       ctx.body = "调用T_approve结果是=>" + res;
//     });
//   });
//
//   /**
//  * @get{方式发起 代币合约的allowanc交易}
//  * @method {allowanc}
//  * @for {routerList}
//  * @param {address owner,uint256 value}
//  * @return {hash}
//  */
//   router.get('/Token/T_allowance', (ctx, next) => {
//     // TODO:
//     ctx.body = "T_allowance";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.T_allowance({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {
//       ctx.body = "调用T_allowance结果是=>" + res;
//     });
//   });
//
//   //空投合约路由
//
//   /**
//  * @get{方式发起 空投合约的setToken交易}
//  * @method {setToken}
//  * @for {routerList}
//  * @param {address _token}
//  * @return {hash}
//  */
//   router.get('/Drop/D_setToken', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_setToken";
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Drop.D_setToken({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {
//       ctx.body = "调用D_setToken结果是=>" + res;
//     });
//   });
//
//   /**
//  * @get{方式发起 空投合约的multiSendandself交易}
//  * @method {multiSendandself}
//  * @for {routerList}
//  * @param {address[] memory  _destAddrs,uint256[]  memory _values,uint256  _valuesmyself}
//  * @return {hash}
//  */
//   router.get('/Drop/D_multiSendandself', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_multiSendandself";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     // TODO:
//     if (Pms_package.data.address.length <= 0 || Pms_package.data.uint256.length <= 0) {
//       console.log("参数错误", Pms_package.data.address.length);
//       return
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Drop.D_multiSendandself({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {
//
//       ctx.body = "调用D_multiSendandself结果是=>" + res;
//
//     });
//   });
//
//   /**
//  * @get{方式发起 空投合约的multiSend交易}
//  * @method {multiSend}
//  * @for {routerList}
//  * @param {address[]  memory _destAddrs, uint256[] memory _values}
//  * @return {hash}
//  */
//   router.get('/Drop/D_multiSend', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_multiSend";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.D_setToken({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {});
//   });
//
//   /**
//  * @get{方式发起 空投合约的multiself交易}
//  * @method {multiSend}
//  * @for {routerList}
//  * @param {uint256  _values,address  addres_owner}
//  * @return {hash}
//  */
//   router.get('/Drop/D_multiself', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_multiself";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.D_multiself({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {});
//   });
//
//   /**
//  * @get{方式发起 空投合约的settrustOwner-存入白名单}
//  * @method {settrustOwner}
//  * @for {routerList}
//  * @param {address  _ownaddress,string memory _owntext}
//  * @return {hash}
//  */
//   router.get('/Drop/D_settrustOwner', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_settrustOwner";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.D_settrustOwner({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {});
//   });
//
//   /**
//  * @get{方式发起 空投合约的seterctypeName-存入合约记录}
//  * @method {settrustOwner}
//  * @for {routerList}
//  * @param {address  _ownaddress,string memory _owntext}
//  * @return {hash}
//  */
//   router.get('/Drop/D_seterctypeName', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_seterctypeName";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.D_seterctypeName({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {});
//   });
//
//   /**
//  * @get{方式发起 空投合约的sethistoricalOwner-存入历史纪录}
//  * @method {sethistoricalOwner}
//  * @for {routerList}
//  * @param {address  _hisaddress,string memory _histext}
//  * @return {hash}
//  */
//   router.get('/Drop/D_sethistoricalOwner', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_sethistoricalOwner";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.D_sethistoricalOwner({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {});
//   });
//
//   /**
//  * @get{方式发起 空投合约的transfer-存入历史纪录}
//  * @method {transfer}
//  * @for {routerList}
//  * @param {address to, uint256 value}
//  * @return {hash}
//  */
//   router.get('/Drop/D_transfer', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_transfer";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.D_transfer({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {});
//   });
//
//   /**
//  * @get{方式发起 空投合约的approve }
//  * @method {approve}
//  * @for {routerList}
//  * @param {address spender, uint256 value}
//  * @return {hash}
//  */
//   router.get('/Drop/D_approve', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_approve";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.D_approve({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {});
//   });
//
//   /**
//  * @get{方式发起 空投合约的transferFrom}
//  * @method {transferFrom}
//  * @for {routerList}
//  * @param {address from, address to, uint256 value}
//  * @return {hash}
//  */
//   router.get('/Drop/D_transferFrom', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_transferFrom";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.D_transferFrom({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {});
//   });
//
//   /**
//  * @get{方式发起 空投合约的balanceOf}
//  * @method {balanceOf}
//  * @for {routerList}
//  * @param {address owner}
//  * @return {hash}
//  */
//   router.get('/Drop/D_balanceOf', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_balanceOf";
//     // TODO:
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//       data: {
//         address: ctx.request.query.address,
//         uint256: ctx.request.query.uint256
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.D_balanceOf({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {});
//   });
//   //  M_prepare 路由
//   /**
//  * @get{方式发起 空投合约的prepare}
//  * @method {prepare}
//  * @for {routerList}
//  * @param {}
//  * @return {hash}
//  */
//   router.get('/Drop/M_prepare', (ctx, next) => {
//     //  01. TODO:校验数据
//     //  02. 解析数据打包
//     let Pms_package = {
//
//       //参数解析
//       data: {
//         rand: ctx.request.query.rand, //数组
//         from: ctx.request.query.from,
//         token: ctx.request.query.token,
//         value: ctx.request.query.value
//       },
//
//       //url 解析
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//
//       //地址解析
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     Querydata = async (data, next) => {
//       //调用查询合约方法
//       let result = await Actions_Contrant_TokenMgr.M_prePare({
//         //1.状态
//         state: data,
//         //2.参数
//         data: data,
//         //3.系统参数
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     Querydata(Pms_package.data).then(res => {
//       ctx.body = "调用M_prePare结果是=>" + res;
//     });
//   });
//
//   /**
//  * @get{方式发起 空投合约的flyDrop}
//  * @method {flyDrop}
//  * @for {routerList}
//  * @param {}
//  * @return {hash}
//  */
//   router.get('/Drop/M_flyDrop', (ctx, next) => {
//     //  01. TODO:校验数据
//     console.log("url：http://127.0.0.1:3003/Drop/M_flyDrop");
//     //  02. 解析数据打包
//     let Pms_package = {
//
//       //参数解析
//       data: {
//         destAddrs: ctx.request.query.destAddrs, //数组
//         values: ctx.request.query.value
//       },
//
//       //url 解析
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//
//       //地址解析
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     //  03. 查询方法
//     Querydata = async (data, next) => {
//       //调用查询合约方法
//       let result = await Actions_Contrant_TokenMgr.M_flyDrop({
//         //1.状态
//         state: data,
//         //2.参数
//         data: data,
//         //3.系统参数
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     Querydata(Pms_package.data).then(res => {
//       ctx.body = "调用flyDrop结果是=>" + res;
//     });
//   });
// },
// //post 路由
// router_post: () => {
//   //
//   router.post('/', (ctx, next) => {
//     // TODO:
//     ctx.body = "测试路由111";
//   });
//   //单例模型 34531
//   router.post('/Token/Test', (ctx, next) => {
//     // TODO:
//     let data = ctx.request.body;
//     console.log("post请求---------------", data);
//     //  01. TODO:校验数据
//     let cData = Actions_Web3jsUtils.web3_postVerifiCation(data);
//     console.log("返回数据是：", cData);
//     //调用 合约方法
//     // TODO:校验数据
//     // let sFrom = Json_list. ;
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Token.T_Test_Batch({
//         data
//       });
//       console.log("1111=>", result);
//       return result;
//     }
//     //结果返回
//     deploy(cData).then(res => {
//       ctx.body = "调用tranfer结果是=>" + res;
//     });
//     return cData;
//     //  02. 解析数据打包
//     // let Pms_package = {
//     //   data: {
//     //     address: ctx.request.body.address,
//     //     uint256: ctx.request.query.uint256
//     //   },
//     //   ctx: {
//     //     url: ctx.url,
//     //     request: ctx.request,
//     //     req_querystring: ctx.req_querystring,
//     //     req_querystring: ctx.req_querystring
//     //   },
//     //   address: {
//     //     from: "",
//     //     to: "",
//     //     value: ''
//     //   },
//     //   bz: {}
//     // }
//     // //  03. 查询方法
//     // deploy = async (data, next) => {
//     //   let result = await Actions_Contrant_Token.T_transfer({
//     //     state: data,
//     //     data: data,
//     //     system: data
//     //   });
//     //   console.log("=>", result);
//     //   return result;
//     // }
//     //  04. 结果返回
//     // deploy(Pms_package.data).then(res => {
//     //   ctx.body = "调用tranfer结果是=>" + res;
//     // });
//   });
//   router.post('/Token/T_transferFrom', (ctx, next) => {
//     // TODO:
//     ctx.body = "T_transferFrom";
//     //ctx.request.body
//     console.log("post请求");
//     console.log(ctx.request.body);
//     ctx.body = "T_transferFrom";
//   });
//
//   router.post('/Token/T_transfer', (ctx, next) => {
//     // TODO:
//     ctx.body = "T_transfer";
//   });
//
//   router.post('/Token/T_approve', (ctx, next) => {
//     // TODO:
//     ctx.body = "T_approve";
//   });
//
//   router.post('/Token/T_allowance', (ctx, next) => {
//     // TODO:
//     ctx.body = "T_allowance";
//   });
//
//   /**  @ 空投合约 -初始化代币
//   */
//   router.post('/Drop/D_setToken', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_setToken";
//     let Pms_package = {
//       data: {
//         // address: ctx.request.query.address,
//          address: '0x32cDA8ca0A0fFA4cb7F40ccc33e007950d96A34F',
//       },
//       ctx: {
//         url: ctx.url,
//         request: ctx.request,
//         req_querystring: ctx.req_querystring,
//         req_querystring: ctx.req_querystring
//       },
//       address: {
//         from: "",
//         to: "",
//         value: ''
//       },
//       bz: {}
//     }
//     console.log("初始化代币");
//     //要初始化的合约的地址, 调用地址验证方法,
//     let Token_address = '0x32cDA8ca0A0fFA4cb7F40ccc33e007950d96A34F';
//     //调用web3校验函数判断当前函数是否是有效地址 3021
//     let cData =  {address:Token_address};
//     console.log("对象化的地址是：",cData);
//     let result =   Actions_Web3jsUtils.web_postisAddress(cData);
//     console.log("地址校验的结果是：",result.sState);
//     //如果地址校验通过,调用智能合约
//
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Drop.D_setToken({
//         state: data,
//         data: data,
//         system: data
//       });
//       console.log("=>", result);
//       return result;
//     }
//     //  04. 结果返回
//     deploy(Pms_package.data).then(res => {
//       ctx.body = "调用D_setToken结果是=>" + res;
//     });
//
//   });
//
//   router.post('/Drop/D_multiSendandself', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_multiSendandself";
//   });
//   /**  @ 空投合约 -批量投放代币*/
//
//   //
//
//   router.post('/Drop/D_multiSend_te',(ctx, next) => {
//     // TODO:
//     ctx.body = "D_multiSend_te";
//     // TODO:
//     let data = ctx.request.body;
//     // console.log("post请求-----D_multiSend_te", data.data);
//     // console.log("post请求-----D_multiSend_te", data);
//     //  01. TODO:校验数据
//       let cData = data.data;
//     // console.log("----------------",cData,cData.length,typeof (cData));
//
//      // for(var i in cData){
//      //   console.log("00",i,cData[i].A,"B=",cData[i].B);
//      // }
//     let resultData = Actions_Web3jsUtils.web3_postVerifiCation_big(cData);
//     // console.log("web3_postVerifiCation返回数据是：", resultData);
//     //调用 合约方法
//     // TODO:校验数据
//     // let sFrom = Json_list. ;
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Drop.D_multiSend_Test({
//         data:data
//       });
//       console.log("1111=>", result);
//       return result;
//     }
//     //结果返回
//     deploy(resultData).then(res => {
//       ctx.body = "调用tranfer结果是=>" + res;
//     });
//     return cData;
//   });
//   //
//   router.post('/Drop/D_multiSend', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_multiSend";
//
//     // TODO:
//     let data = ctx.request.body;
//     console.log("post请求-----D_multiSend", data);
//     //  01. TODO:校验数据
//     let cData = Actions_Web3jsUtils.web3_postVerifiCation(data);
//     console.log("web3_postVerifiCation返回数据是：", cData);
//     //调用 合约方法
//     // TODO:校验数据
//     // let sFrom = Json_list. ;
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Drop.D_multiSend({
//         data
//       });
//       console.log("1111=>", result);
//       return result;
//     }
//     //结果返回
//     deploy(cData).then(res => {
//       ctx.body = "调用tranfer结果是=>" + res;
//     });
//     return cData;
//   });
//
//   router.post('/Drop/D_multiSend2', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_multiSend2";
//   });
//
//   router.post('/Drop/D_multiself', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_multiself";
//   });
//
//   router.post('/Drop/D_settrustOwner', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_settrustOwner";
//   });
//
//   router.post('/Drop/D_seterctypeName', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_seterctypeName";
//   });
//
//   router.post('/Drop/D_sethistoricalOwner', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_sethistoricalOwner";
//   });
//
//   router.post('/Drop/D_transfer', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_transfer";
//   });
//
//   router.post('/Drop/D_approve', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_approve";
//   });
//
//   router.post('/Drop/D_transferFrom', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_transferFrom";
//   });
//
//   router.post('/Drop/D_balanceOf', (ctx, next) => {
//     // TODO:
//     ctx.body = "D_balanceOf";
//   });
//
//   //
//   router.post('/Drop/M_prePare', (ctx, next) => {
//     // TODO:
//     ctx.body = "M_prepare";
//   });
//
//   router.post('/Drop/M_flyDrop', (ctx, next) => {
//     // TODO:
//     ctx.body = "M_flyDrop";
//   });
//
//   //闪电空投
//   router.post('/Bolt/flyDrop', (ctx, next) => {
//     // TODO:
//     ctx.body = "M_flyDrop";
//     //01. 这里有一个大的改变就是校验的话放到他本地了，如果要加上服务端校验，
//     // TODO:
//     // console.log("接收到闪电空投的数据是：",ctx);
//     console.log("接收到闪电空投的数据是：", ctx.request.body);
//     //
//     let cData = ctx.request.body;
//     //
//     // TODO: 数据校验省略,
//     // 发送请求
//     deploy = async (data, next) => {
//       let result = await Actions_Contrant_Drop.D_boltDrop({
//         data:data
//       });
//       console.log("1111=>", result);
//       return result;
//     }
//
//     deploy(cData).then(res => {
//       ctx.body = "调用/Bolt/flyDrop结果是=>" + res;
//     });
//     return cData;
//   });
// },
// }
//
// // const sleep = require("sleep-promise");
// // const log4js = require('log4js');
// // const logger = log4js.getLogger();
// //   logger.level = 'info';
// //   var c = new Date();
// //   var myDate = new Date();
// //   var mytime=myDate.toLocaleDateString();
// //   let sfileName = '../logs/'+'info-'+mytime+'.log';
// // log4js.configure({
// //   appenders: {
// //     out: { type: 'stdout' },//设置是否在控制台打印日志
// //     info: { type: 'file', filename: sfileName}
// //   },
// //   categories: {
// //     default: { appenders: [ 'out', 'info' ], level: 'info' }//去掉'out'。控制台不打印日志
// //   }
// // });
// //  //
// //
// //
// // logger.info("adjfasodjfaosdjfo asjdfasdfsdf");
// // logger.info("adjfasodjfaosdjfo asjdadsdfasdfdadsfadfasdfsdafasdfasdffadfadsfasdf");
// // logger.info("2222222222222222222222222222222222222222222222222222222222222222");
// // logger.info("2222222222222222222222222222222222222222222222222222222222222222");
// // logger.info("2222222222222222222222222222222222222222222222222222222222222222");
// // logger.info("2222222222222222222222222222222222222222222222222222222222222222");
// // logger.info("2222222222222222222222222222222222222222222222222222222222222222",mytime);
// // (async () => {
// //     await sleep(2000);
// //     console.log('2 seconds later …');
// // })();
//
//
// // D_boltDrop: async (data) => {
// //   // TODO:
// //   let  result;
// //   let cData = data;
// //   console.log("调用合约方法-Token-D_boltDrop...", cData);
// //   let parsm = cData.data;
// //   console.log("D_multiSend的数据：address",parsm.address);
// //   console.log("D_multiSend的数据：value",parsm.value);
// //   // TODO: 切割数据
// //
// //   //参数
// //   let resultData ={
// //     Sum:0,
// //     Normal:0,
// //     Unnormal:0,
// //     Data:[],
// //     unData:[]
// //   }; //结果集
// //   let Parames_data = {
// //     Type: {
// //       param1: "address _form",
// //       param2: "address _to",
// //       param3: "uint256 _value"
// //     },
// //     Value: {
// //       param1: data.from,
// //       param2: data.to,
// //       param3: data.value
// //     }
// //   }
// //   // let data;
// //   let Parames_address = {
// //     //合约地址
// //     contractAddress: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
// //     //发送者
// //     fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
// //     //调用者
// //     toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
// //   }
// //   //序列化数据
// //
// //   let Parames_row = {
// //     Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
// //     Tx_gasPrice: web3.toHex((web3.eth.gasPrice)*1.2),
// //     Tx_gasLimit: web3.toHex(8000000),
// //     Tx_from: Parames_address.fromAddress,
// //     Tx_to: Parames_address.contractAddress,
// //     Tx_value: "0x0",
// //         //// TODO:
// //     Tx_data: Contract_Drop.multiSend.getData(parsm.address,parsm.value, {
// //     from: Parames_address.fromAddress
// //       })
// //   }
// //
// //       //  05. 对接数据
// //       let rawTx = {
// //         nonce: Parames_row.Tx_nonce,
// //         gasPrice: Parames_row.Tx_gasPrice, // TODO:
// //         gasLimit: Parames_row.Tx_gasLimit,
// //         from: Parames_row.Tx_from,
// //         to: Parames_row.Tx_to,
// //         value: Parames_row.Tx_value, // TODO:
// //         data: Parames_row.Tx_data
// //       }
// //           // 06.签名编译
// //           let SignData = Actions_CommonTool.Tool_SignData({//3483
// //             rawTx: rawTx,
// //             key: Json_list.PRIVATEKEY.Drop_privateKey
// //           });
// //           result = await web3.eth.sendRawTransaction(SignData);
// //            // web3.eth.sendRawTransaction(SignData,(err,hash)=>{
// //            //     if (!err){
// //            //       console.log("hash-----------",hash);
// //            //     }else{
// //            //       console.log("err",err);
// //            //     }
// //            // });
// //
// //           console.log("----发送交易返回数据是：",result);
// //           return result;
// //
// // },
// // for (var i=0;i<100;i+=5){
// //   console.log("ddd",i);
// // }
//
// // var arr = new Array(6)
// // arr[0] = "George"
// // arr[1] = "John"
// // arr[2] = "Thomas"
// // arr[3] = "James"
// // arr[4] = "Adrew"
// // arr[5] = "Martin"
// // let result ={
// //   State: 0,//0 1 3
// //   Tote:4,
// //   Valid:0,
// //   UnValid:0,
// //   ValidData:[],
// //   UnValidData:[],
// //   Bz:[],
// // }
// // //
// // var a ={a:"张三"}
// // var b ={b:"历史"}
// // result.ValidData.push(a);
// // result.ValidData.push(b);
// // var  a ="";
// // var  b ="";
// // //
// // if((b=="")&&(a=="")){
// // console.log("aaa11111111");
// // }
// // //
// // for(var i =0;i<100;i++){
// //  if (i==5){
// // continue
// //  }
// //  console.log(i);
// //
// // }
// // let Action = {
// //   one:"aab",
// //   two:"dbe",
// //   three:"scik"
// // }
// //
// // //
// // Action.
// // let ab ="利飞张飞地方阿尼分拿掉搞等你么米";
// // var pattern1 = /[\u4e00-\u9fa5]+/g;
// // var pattern2 = /\[[\u4e00-\u9fa5]+\]/g;
// // var contents = "[微笑][撇嘴][发呆][得意][流泪]";
// // content = contents.match(pattern1);
// // console.log(content);
// // let ac = content.toString();
// // console.log("tostirng",ac);
// // console.log(ac.indexOf("呆") != -1);
//
// // let result ={
// //   State: 0,//0 1 3
// //   Valid:0,
// //   UnValid:0,
// //   ValidData:[],
// //   UnValidData:[],
// //   Bz:[]
// // }
// // //
// //  let arr = {1:Json_list.STATES_PAR.notValue}
// //     result.UnValidData.push(arr);
// //     //
// //     console.log("---",result.UnValidData);
//
// // let a = '3.5555554';
// //   let sc = parseFloat(a).toFixed(4);
// //   let bc =sc*1000;
// // let b =(sc*1000).toFixed(4);
// // console.log("---",bc);
// // console.log("---",b);
// // let a = 500;
// // let b =50;
// // let abc =[];
// // let cd={3:"张三"};
// // let cd1={4:"张三"};
// // let cd2={5:"张三"};
// // let cd3={6:"张三"};
// // let cd4={7:"张三"};
// // let cd5={8:"张三"};
// // abc.push(cd);
// // abc.push(cd1);
// // abc.push(cd2);
// // abc.push(cd3);
// // abc.push(cd4);
// // abc.push(cd5);
// //
// // //
// // let lengths = 5;
// // // let data_length = data.length;
// // let arr = [];//临时数组
// // let brr = [];//返回数组
// // //数据处理
// // for(let i=0;i<500;i++){
// //     //
// //     let is = i+1;
// //     if(is%lengths==0){
// //       console.log("--",i);
// //     //   //单位切割组装
// //       let isc = i/5;
// //       let iscs =isc.toString();
// //       let rows = {arr};
// //     //   //填充切割数组
// //       brr.push(arr);
// //       console.log(i);
// //     //   //清空临时数组
// //       arr = [];
// //     // }
// //     //
// //     }
// //     arr.push(i);
// //   }
// //   console.log("-----",brr);
