//导入包
const Web3 = require("web3");
const Koa = require('koa');
const solc = require('solc');
const fs = require("fs");
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const render = require('koa-art-template');
const path = require('path');
const views = require('koa-views');
const cors = require('@koa/cors');
const convert = require('koa-convert');
// const HDWalletProvider = require('truffle-hdwallet-provider');
const Tx = require('ethereumjs-tx');
const sleep = require("sleep-promise");
const log4js = require('log4js');
//json
const walletConfig = require('./walletConfig.json');
// const esponceData = require("./responceData.js");
//json-ABI
const UR_Contract_addresss = require('../contractAbi/Contract_addresss.json');
const UR_DrcAirDrop = require('../contractAbi/DrcAirDrop.json');
const UR_DrcToken = require('../contractAbi/DrcToken.json');
//init
//han dle request entity too large

const app = new Koa();
var web3 = new Web3();
//init contractname
var Contract_Token;
var Contract_Drop;
var Contract_TokenMgr;
/*方法说明
 *@method 方法名
 *@for 所属类名
 *@param{参数类型}参数名 参数说明
 *@return {返回值类型} 返回值说明
 */
/**Read me
 * 1.简称(Token=>T,Drop=>D,TokenMgr=>M)
 * 2.Actions_data=>参数初始化(各种初始化参数)
 * 3.Actions_Koa=>Koa框架以及Koa插件初始化和启动配置(Koa相关)
 * 4.Actions_Router=>router路由的get方法，post方法配置
 * 5.Actions_initWeb3Provider=>web3js相关初始化参数(web3,合约实例等)
 * 6.Actions_Web3jsCommonMethod=>webjs常用的方法(获取各种参数)
 * 7.Actions_Web3jsUtils=>web3js相关的工具方法(转换,校验等)
 * 8.Actions_Contrant_Token=>skt测试代币的相关方法的实现(Token)
 * 9.Actions_Contrant_Drop=> 空投合约的相关方法的实现(Drop)
 *10.Actions_Contrant_TokenMgr=>项目之前空投合约的相关方法的实现(TokenMgr)
 *11.Actions_Configure=>项目相关配置信息()
 *12.Json_list=>常量信息的相关管理(abi,合约地址,gas参数,等)
 *13.Json_Bz=>其它备注信息(追加,扩展)
 */
//2.Actions_data=>参数初始化(各种初始化参数)
var Actions_data = {
  Type_init: () => {

  }
}
//3.Actions_Koa=>Koa框架以及Koa插件初始化和启动配置(Koa相关)
var Actions_Koa = {

  //配置 koa-art-template模板引擎
  render: () => {
    render(app, {
      root: path.join(__dirname, '../views'), // 视图的位置
      extname: '.html', // 后缀名
      debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
    })
  },
  //配置相关
  user: () => {
    app.use(views('../views', {
      extension: 'html'
    }));
    // app.use(async ctx => {
    //   ctx.body = ctx.request.body;
    // });

    const logger = log4js.getLogger();
    logger.level = 'info';
    log4js.configure({
      appenders: {
        out: { type: 'stdout' },//设置是否在控制台打印日志
        info: { type: 'file', filename: '../logs/info.log' }
      },
      categories: {
        default: { appenders: [ 'out', 'info' ], level: 'info' }//去掉'out'。控制台不打印日志
      }
    });
    app.use(convert(bodyParser({
        enableTypes:['json', 'form', 'text'],
        formLimit:"10mb",
        queryString:{
        parameterLimit:100000000000000
      }
    })));
    app.use(cors());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.use(bodyParser());
    app.listen(3003, () => {
      console.log("start at port 3003");
    });
  }
}
//4.Actions_Router=>router路由的get方法，post方法配置
var Actions_Router = {
  //get 路由
  router_get: () => {
    //首页
    router.get('/', (ctx, next) => {
      // TODO:
      ctx.body = "测试路由";
    });
    //测试页面
    router.get('/test', async (ctx, next) => {
      // TODO:
      ctx.body = "测试路由";
      // TODO:
      let list = {
        name: '张三',
        num: 20
      }
      await ctx.render('execl', {
        list: list
      });
    });
    /**
    代币测试
    */

    /**
   * @get{方式发起 代币合约的transferFrom交易}
   * @method {transferFrom}
   * @for {NodeList}
   * @param {address from,address to, uint256 value}
   * @return {hash}
   */
    router.get('/Token/T_transferFrom', (ctx, next) => {
      // TODO:校验数据
      let sFrom = Json_list.ADDRESS_TOKEN;
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_transferFrom({
          from: data,
          to: data,
          value: data
        });
        console.log("1111=>", result);
        return result;
      }
      //结果返回
      deploy(sFrom).then(res => {
        ctx.body = "调用tranfer结果是=>" + res;
      });
    });

    /**
   * @get{方式发起 代币合约的transfer交易}
   * @method {transfer}
   * @for {routerList}
   * @param {address to,uint256 value}
   * @return {hash}
   */
    router.get('/Token/T_transfer', (ctx, next) => {
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_transfer({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用tranfer结果是=>" + res;
      });
    });

    /**
   * @get{方式发起 代币合约的balanceOf交易}
   * @method {balanceOf}
   * @for {routerList}
   * @param {address owner}
   * @return {hash}
   */
    router.get('/Token/T_balanceOf', (ctx, next) => {
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_balanceOf({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用T_balanceOf结果是=>" + res;
      });
    });

    /**
   * @get{方式发起 代币合约的approv交易}
   * @method {approve}
   * @for {routerList}
   * @param {address spender,uint256 value}
   * @return {hash}
   */
    router.get('/Token/T_approve', (ctx, next) => {
      // TODO:
      ctx.body = "T_approve"; //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_approve({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用T_approve结果是=>" + res;
      });
    });

    /**
   * @get{方式发起 代币合约的allowanc交易}
   * @method {allowanc}
   * @for {routerList}
   * @param {address owner,uint256 value}
   * @return {hash}
   */
    router.get('/Token/T_allowance', (ctx, next) => {
      // TODO:
      ctx.body = "T_allowance";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_allowance({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用T_allowance结果是=>" + res;
      });
    });

    //空投合约路由

    /**
   * @get{方式发起 空投合约的setToken交易}
   * @method {setToken}
   * @for {routerList}
   * @param {address _token}
   * @return {hash}
   */
    router.get('/Drop/D_setToken', (ctx, next) => {
      // TODO:
      ctx.body = "D_setToken";
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Drop.D_setToken({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用D_setToken结果是=>" + res;
      });
    });

    /**
   * @get{方式发起 空投合约的multiSendandself交易}
   * @method {multiSendandself}
   * @for {routerList}
   * @param {address[] memory  _destAddrs,uint256[]  memory _values,uint256  _valuesmyself}
   * @return {hash}
   */
    router.get('/Drop/D_multiSendandself', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiSendandself";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      // TODO:
      if (Pms_package.data.address.length <= 0 || Pms_package.data.uint256.length <= 0) {
        console.log("参数错误", Pms_package.data.address.length);
        return
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Drop.D_multiSendandself({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {

        ctx.body = "调用D_multiSendandself结果是=>" + res;

      });
    });

    /**
   * @get{方式发起 空投合约的multiSend交易}
   * @method {multiSend}
   * @for {routerList}
   * @param {address[]  memory _destAddrs, uint256[] memory _values}
   * @return {hash}
   */
    router.get('/Drop/D_multiSend', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiSend";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_setToken({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    /**
   * @get{方式发起 空投合约的multiself交易}
   * @method {multiSend}
   * @for {routerList}
   * @param {uint256  _values,address  addres_owner}
   * @return {hash}
   */
    router.get('/Drop/D_multiself', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiself";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_multiself({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    /**
   * @get{方式发起 空投合约的settrustOwner-存入白名单}
   * @method {settrustOwner}
   * @for {routerList}
   * @param {address  _ownaddress,string memory _owntext}
   * @return {hash}
   */
    router.get('/Drop/D_settrustOwner', (ctx, next) => {
      // TODO:
      ctx.body = "D_settrustOwner";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_settrustOwner({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    /**
   * @get{方式发起 空投合约的seterctypeName-存入合约记录}
   * @method {settrustOwner}
   * @for {routerList}
   * @param {address  _ownaddress,string memory _owntext}
   * @return {hash}
   */
    router.get('/Drop/D_seterctypeName', (ctx, next) => {
      // TODO:
      ctx.body = "D_seterctypeName";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_seterctypeName({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    /**
   * @get{方式发起 空投合约的sethistoricalOwner-存入历史纪录}
   * @method {sethistoricalOwner}
   * @for {routerList}
   * @param {address  _hisaddress,string memory _histext}
   * @return {hash}
   */
    router.get('/Drop/D_sethistoricalOwner', (ctx, next) => {
      // TODO:
      ctx.body = "D_sethistoricalOwner";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_sethistoricalOwner({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    /**
   * @get{方式发起 空投合约的transfer-存入历史纪录}
   * @method {transfer}
   * @for {routerList}
   * @param {address to, uint256 value}
   * @return {hash}
   */
    router.get('/Drop/D_transfer', (ctx, next) => {
      // TODO:
      ctx.body = "D_transfer";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_transfer({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    /**
   * @get{方式发起 空投合约的approve }
   * @method {approve}
   * @for {routerList}
   * @param {address spender, uint256 value}
   * @return {hash}
   */
    router.get('/Drop/D_approve', (ctx, next) => {
      // TODO:
      ctx.body = "D_approve";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_approve({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    /**
   * @get{方式发起 空投合约的transferFrom}
   * @method {transferFrom}
   * @for {routerList}
   * @param {address from, address to, uint256 value}
   * @return {hash}
   */
    router.get('/Drop/D_transferFrom', (ctx, next) => {
      // TODO:
      ctx.body = "D_transferFrom";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_transferFrom({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    /**
   * @get{方式发起 空投合约的balanceOf}
   * @method {balanceOf}
   * @for {routerList}
   * @param {address owner}
   * @return {hash}
   */
    router.get('/Drop/D_balanceOf', (ctx, next) => {
      // TODO:
      ctx.body = "D_balanceOf";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_balanceOf({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    //  M_prepare 路由
    /**
   * @get{方式发起 空投合约的prepare}
   * @method {prepare}
   * @for {routerList}
   * @param {}
   * @return {hash}
   */
    router.get('/Drop/M_prepare', (ctx, next) => {
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {

        //参数解析
        data: {
          rand: ctx.request.query.rand, //数组
          from: ctx.request.query.from,
          token: ctx.request.query.token,
          value: ctx.request.query.value
        },

        //url 解析
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },

        //地址解析
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      Querydata = async (data, next) => {
        //调用查询合约方法
        let result = await Actions_Contrant_TokenMgr.M_prePare({
          //1.状态
          state: data,
          //2.参数
          data: data,
          //3.系统参数
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      Querydata(Pms_package.data).then(res => {
        ctx.body = "调用M_prePare结果是=>" + res;
      });
    });

    /**
   * @get{方式发起 空投合约的flyDrop}
   * @method {flyDrop}
   * @for {routerList}
   * @param {}
   * @return {hash}
   */
    router.get('/Drop/M_flyDrop', (ctx, next) => {
      //  01. TODO:校验数据
      console.log("url：http://127.0.0.1:3003/Drop/M_flyDrop");
      //  02. 解析数据打包
      let Pms_package = {

        //参数解析
        data: {
          destAddrs: ctx.request.query.destAddrs, //数组
          values: ctx.request.query.value
        },

        //url 解析
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },

        //地址解析
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      Querydata = async (data, next) => {
        //调用查询合约方法
        let result = await Actions_Contrant_TokenMgr.M_flyDrop({
          //1.状态
          state: data,
          //2.参数
          data: data,
          //3.系统参数
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      Querydata(Pms_package.data).then(res => {
        ctx.body = "调用flyDrop结果是=>" + res;
      });
    });

  },
  //post 路由
  router_post: () => {
    //
    router.post('/', (ctx, next) => {
      // TODO:
      ctx.body = "测试路由111";
    });
    //测试页面
    router.post('/Token/Test', (ctx, next) => {
      // TODO:
      let data = ctx.request.body;
      console.log("post请求---------------", data);
      //  01. TODO:校验数据
      let cData = Actions_Web3jsUtils.web3_postVerifiCation(data);
      console.log("返回数据是：", cData);
      //调用 合约方法
      // TODO:校验数据
      // let sFrom = Json_list. ;
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_Test_Batch({
          data
        });
        console.log("1111=>", result);
        return result;
      }
      //结果返回
      deploy(cData).then(res => {
        ctx.body = "调用tranfer结果是=>" + res;
      });
      return cData;
      //  02. 解析数据打包
      // let Pms_package = {
      //   data: {
      //     address: ctx.request.body.address,
      //     uint256: ctx.request.query.uint256
      //   },
      //   ctx: {
      //     url: ctx.url,
      //     request: ctx.request,
      //     req_querystring: ctx.req_querystring,
      //     req_querystring: ctx.req_querystring
      //   },
      //   address: {
      //     from: "",
      //     to: "",
      //     value: ''
      //   },
      //   bz: {}
      // }
      // //  03. 查询方法
      // deploy = async (data, next) => {
      //   let result = await Actions_Contrant_Token.T_transfer({
      //     state: data,
      //     data: data,
      //     system: data
      //   });
      //   console.log("=>", result);
      //   return result;
      // }
      //  04. 结果返回
      // deploy(Pms_package.data).then(res => {
      //   ctx.body = "调用tranfer结果是=>" + res;
      // });
    });

    /**
   * @post{方式发起 代币合约的transferFrom交易}
   * @method {transferFrom}
   * @for {NodeList}
   * @param {address from,address to, uint256 value}
   * @return {hash}
   */
    router.post('/Token/T_transferFrom', (ctx, next) => {
      // TODO:
      ctx.body = "T_transferFrom";
      //ctx.request.body
      console.log("post请求");
      console.log(ctx.request.body);
      ctx.body = "T_transferFrom";
    });

    /**
   * @post{方式发起 代币合约的transfer交易}
   * @method {transfer}
   * @for {routerList}
   * @param {address to,uint256 value}
   * @return {hash}
   */
    router.post('/Token/T_transfer', (ctx, next) => {
      // TODO:
      ctx.body = "T_transfer";
    });

    /**
    * @post{方式发起 代币合约的approv交易}
    * @method {approve}
    * @for {routerList}
    * @param {address spender,uint256 value}
    * @return {hash}
    */
    router.post('/Token/T_approve', (ctx, next) => {
      // TODO:
      ctx.body = "T_approve";
    });

    /**
   * @post{方式发起 代币合约的allowanc交易}
   * @method {allowanc}
   * @for {routerList}
   * @param {address owner,uint256 value}
   * @return {hash}
   */
    router.post('/Token/T_allowance', (ctx, next) => {
      // TODO:
      ctx.body = "T_allowance";
    });

    /**
   * @post{方式发起 空投合约的setToken交易}
   * @method {setToken}
   * @for {routerList}
   * @param {address _token}
   * @return {hash}
   */
    router.post('/Drop/D_setToken', (ctx, next) => {
      // TODO:
      ctx.body = "D_setToken";
      let Pms_package = {
        data: {
          // address: ctx.request.query.address,
           address: '0x32cDA8ca0A0fFA4cb7F40ccc33e007950d96A34F',
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      console.log("初始化代币");
      //要初始化的合约的地址, 调用地址验证方法,
      let Token_address = '0x32cDA8ca0A0fFA4cb7F40ccc33e007950d96A34F';
      //调用web3校验函数判断当前函数是否是有效地址 3021
      let cData =  {address:Token_address};
      console.log("对象化的地址是：",cData);
      let result =   Actions_Web3jsUtils.web_postisAddress(cData);
      console.log("地址校验的结果是：",result.sState);
      //如果地址校验通过,调用智能合约

      deploy = async (data, next) => {
        let result = await Actions_Contrant_Drop.D_setToken({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用D_setToken结果是=>" + res;
      });

    });

    /**
   * @post{方式发起 空投合约的multiSendandself交易}
   * @method {multiSendandself}
   * @for {routerList}
   * @param {address[] memory  _destAddrs,uint256[]  memory _values,uint256  _valuesmyself}
   * @return {hash}
   */
    router.post('/Drop/D_multiSendandself', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiSendandself";
    });
    /**  @ 空投合约 -批量投放代币*/

    /**
   * @post{方式发起 test}
   * @method {D_multiSend_te}
   * @for {routerList}
   * @param {address[] memory  _destAddrs,uint256[]  memory _values,uint256  _valuesmyself}
   * @return {hash}
   */
    router.post('/Drop/D_multiSend_te',(ctx, next) => {
      // TODO:
      ctx.body = "D_multiSend_te";
      // TODO:
      let data = ctx.request.body;
      // console.log("post请求-----D_multiSend_te", data.data);
      // console.log("post请求-----D_multiSend_te", data);
      //  01. TODO:校验数据
        let cData = data.data;
      // console.log("----------------",cData,cData.length,typeof (cData));

       // for(var i in cData){
       //   console.log("00",i,cData[i].A,"B=",cData[i].B);
       // }
      let resultData = Actions_Web3jsUtils.web3_postVerifiCation_big(cData);
      // console.log("web3_postVerifiCation返回数据是：", resultData);
      //调用 合约方法
      // TODO:校验数据
      // let sFrom = Json_list. ;
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Drop.D_multiSend_Test({
          data:data
        });
        console.log("1111=>", result);
        return result;
      }
      //结果返回
      deploy(resultData).then(res => {
        ctx.body = "调用tranfer结果是=>" + res;
      });
      return cData;
    });
    //
    /**
   * @post{方式发起 空投合约的multiSend交易}
   * @method {multiSend}
   * @for {routerList}
   * @param {address[]  memory _destAddrs, uint256[] memory _values}
   * @return {hash}
   */
    router.post('/Drop/D_multiSend', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiSend";

      // TODO:
      let data = ctx.request.body;
      console.log("post请求-----D_multiSend", data);
      //  01. TODO:校验数据
      let cData = Actions_Web3jsUtils.web3_postVerifiCation(data);
      console.log("web3_postVerifiCation返回数据是：", cData);
      //调用 合约方法
      // TODO:校验数据
      // let sFrom = Json_list. ;
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Drop.D_multiSend({
          data
        });
        console.log("1111=>", result);
        return result;
      }
      //结果返回
      deploy(cData).then(res => {
        ctx.body = "调用tranfer结果是=>" + res;
      });
      return cData;
    });
    /**
   * @post{方式发起 空投合约的multiself交易}
   * @method {multiSend}
   * @for {routerList}
   * @param {uint256  _values,address  addres_owner}
   * @return {hash}
   */
    router.post('/Drop/D_multiself', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiself";
    });

    /**
   * @post{方式发起 空投合约的settrustOwner-存入白名单}
   * @method {settrustOwner}
   * @for {routerList}
   * @param {address  _ownaddress,string memory _owntext}
   * @return {hash}
   */
    router.post('/Drop/D_settrustOwner', (ctx, next) => {
      // TODO:
      ctx.body = "D_settrustOwner";
    });

    /**
   * @post{方式发起 空投合约的seterctypeName-存入合约记录}
   * @method {settrustOwner}
   * @for {routerList}
   * @param {address  _ownaddress,string memory _owntext}
   * @return {hash}
   */
    router.post('/Drop/D_seterctypeName', (ctx, next) => {
      // TODO:
      ctx.body = "D_seterctypeName";
    });

    /**
   * @post{方式发起 空投合约的sethistoricalOwner-存入历史纪录}
   * @method {sethistoricalOwner}
   * @for {routerList}
   * @param {address  _hisaddress,string memory _histext}
   * @return {hash}
   */
    router.post('/Drop/D_sethistoricalOwner', (ctx, next) => {
      // TODO:
      ctx.body = "D_sethistoricalOwner";
    });

    /**
   * @post{方式发起 空投合约的transfer-存入历史纪录}
   * @method {transfer}
   * @for {routerList}
   * @param {address to, uint256 value}
   * @return {hash}
   */
    router.post('/Drop/D_transfer', (ctx, next) => {
      // TODO:
      ctx.body = "D_transfer";
    });

    /**
   * @post{方式发起 空投合约的approve }
   * @method {approve}
   * @for {routerList}
   * @param {address spender, uint256 value}
   * @return {hash}
   */
    router.post('/Drop/D_approve', (ctx, next) => {
      // TODO:
      ctx.body = "D_approve";
    });

    /**
   * @post{方式发起 空投合约的transferFrom}
   * @method {transferFrom}
   * @for {routerList}
   * @param {address from, address to, uint256 value}
   * @return {hash}
   */
    router.post('/Drop/D_transferFrom', (ctx, next) => {
      // TODO:
      ctx.body = "D_transferFrom";
    });

    /**
   * @post{方式发起 空投合约的balanceOf}
   * @method {balanceOf}
   * @for {routerList}
   * @param {address owner}
   * @return {hash}
   */
    router.post('/Drop/D_balanceOf', (ctx, next) => {
      // TODO:
      ctx.body = "D_balanceOf";
    });

    /**
   * @post{方式发起 空投合约的prepare}
   * @method {prepare}
   * @for {routerList}
   * @param {}
   * @return {hash}
   */
    router.post('/Drop/M_prePare', (ctx, next) => {
      // TODO:
      ctx.body = "M_prepare";
    });

    /**
   * @post{方式发起 空投合约的flyDrop}
   * @method {flyDrop}
   * @for {routerList}
   * @param {}
   * @return {hash}
   */
    router.post('/Drop/M_flyDrop', (ctx, next) => {
      // TODO:
      ctx.body = "M_flyDrop";
    });


    /**
   * @post{方式发起 空投合约的flyDrop}//闪电空投
   * @method {flyDrop}
   * @for {routerList}
   * @param {}
   * @return {hash}
   */
    router.post('/Bolt/flyDrop', (ctx, next) => {
      // TODO:
      ctx.body = "M_flyDrop";
      //01. 这里有一个大的改变就是校验的话放到他本地了，如果要加上服务端校验，
      // TODO:
      // console.log("接收到闪电空投的数据是：",ctx);
      console.log("接收到闪电空投的数据是：", ctx.request.body);
      //
      let cData = ctx.request.body;
      //
      // TODO: 数据校验省略,
      // 发送请求
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Drop.D_boltDrop({
          data:data
        });
        console.log("1111=>", result);
        return result;
      }

      deploy(cData).then(res => {
        ctx.body = "调用/Bolt/flyDrop结果是=>" + res;
      });
      return cData;
    });
  }

}
//5.Actions_initWeb3Provider=>web3js相关初始化参数(web3,合约实例等)
var Actions_initWeb3Provider = {
  initWeb3: () => {
    //创建一个web3实例，设置一个provider,成功引入后，就可以用web3的api
    if (typeof web3 == 'undefined') {
      web3 = new Web3(web3.currentProvider); //新建web3对象
      console.log("web3js is undefined");
    } else {
      // TODO:
      web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/ee23e77aa14846d88eb5cad3d59e37f2"));
      //

    } //设置一个provider
    // TODO: web3.utils.isAddress(address)
    console.log("web3=>实例化完成.....");
    console.log("web3.currentProvider=>", web3.currentProvider);
    console.log("web3是否连接成功=>", web3.isConnected());
    console.log("默认账户=>", web3.eth.defaultAccount);
    console.log("默认区块=>", web3.eth.defaultBlock);
    // TODO: 设置默认账户
    web3.eth.defaultAccount = '0x38a8DC14edE1DEf9C437bB3647445eEec06fF105';
    console.log("默认账户=>", web3.eth.defaultAccount);
  },
  initContract_Token: () => {
    // TODO:
    let Abi_Token = UR_DrcToken;
    let Address_Token = UR_Contract_addresss.token.address;
    //Token  实例化
    Contract_Token = web3.eth.contract(Abi_Token).at(Address_Token);
    // TODO:
    console.log("Token合约实例完成=>");
  },
  initContract_Drop: () => {
    // TODO:
    let Abi_Drop = UR_DrcAirDrop;
    let Address_Drop = UR_Contract_addresss.airDrop.address;
    //Token  实例化
    Contract_Drop = web3.eth.contract(Abi_Drop).at(Address_Drop);
    // TODO:
    console.log("Contract_Drop合约实例完成=>");
  },
  initContract_TokenMgr: () => {
    // // TODO:
    // let Abi_TokenMgr = "";
    // let Address_TokenMgr = "";
    // //TokenMgr  实例化
    // var Contract_drop = web3.eth.constant(Abi_TokenMgr).at(Address_TokenMgr);
  }
}
//6.Actions_Web3jsCommonMethod=>webjs常用的方法(获取各种参数)
var Actions_Web3jsCommonMethod = {
  web_api: () => {
    // TODO:
  },
  web_node: () => {
    // TODO:

  },
  web3_isConnected: () => {
    // TODO:
  },
  web3_currentProvider: () => {
    // TODO:
  }
}
//7.Actions_Web3jsUtils=>web3js相关的工具方法(转换,校验等)
var Actions_Web3jsUtils = {
  web_api: () => {
    // TODO:
  },
  web_node: () => {
    // TODO:

  },
  web3_isConnected: () => {
    // TODO:
  },

  //工具函数@预估gas
  web3_estimateGas: (address, data) => {
    // TODO:
    let estimateGas = web3.eth.estimateGas({
      to: address,
      data: data
    });
    estimateGas = this.web3.toHex(estimateGas);
    return estimateGas;
  },

  // 工具函数@预估区块高度
  web3_getNonce: (address) => {
    // TODO:
    let nonce = web3.eth.getTransactionCount(address);
    return nonce;
  },

  //工具函数@序列化私钥
  web3_bufferPrivateKey: (value) => {
    // TODO:from
    const privateKey = new Buffer.from(value, 'hex');
    return privateKey;
  },

  //工具函数@post data verification 3453
  web3_postVerifiCation: (data) => {
    // TODO:from
    //data
    console.log("web3_postVerifiCation", data);
    // //正则表达式处理
    // let pattern1 = /[\u4e00-\u9fa5]+/g;
    // let pattern2 = /\[[\u4e00-\u9fa5]+\]/g;
    // let contents = "[微笑][撇嘴][发呆][得意][流泪]";
    // content = contents.match(pattern1);
    // console.log(content);
    // let ac = content.toString();
    // console.log("tostirng",ac);
    // console.log(ac.indexOf("呆") != -1);
    // let  param = data;
    let param = data.data;
    // TODO: 转化
    let lengths = param.length;
    //结果处理对象
    let result = {
      State: 0, //0 1 3
      Tote: lengths,
      Valid: 0,
      UnValid: 0,
      ValidData: [],
      UnValidData: [],
      Bz: [],
      sData:{
        address:[],
        value:[],
        state:[]
      }
    }
    // 01. 首先判断数据长度
    if (data.length <= 0) {
      result.State = 3; //
      return result;
    }
    //02. 判断地址和内容是否为空
    for (let i = 0; i < lengths; i++) {
      //01.首先判断2个参数都为空
      if ((param[i].address == null || param[i].address == undefined || param[i].address == '') && (param[i].value == null || param[i].value == undefined || param[i].value == '')) {
        //01.如果两位数据都是空
        result.UnValid += 1;
        //对象保存 序号：数据

        let rows = {
          no: +param[i].no,
          address: param[i].address,
          value: param[i].value,
          state: Json_list.STATES_PAR.notAddressandValue.toString()
        }
        // let cData = {i:param[i].no,param[i].address,param[i].value,Json_list.STATES_PAR.CheckPass}};
        result.UnValidData.push(rows);
        //
        continue;
      } else {
        console.log("411");
        //02. 判断地址为空的情况
        if (param[i].address == null || param[i].address == undefined || param[i].address == '') {
          //
          console.log("6");
          result.UnValid += 1;
          //对象保存 序号：数据
          let rows = {
            no: +param[i].no,
            address: param[i].address,
            value: param[i].value,
            state: Json_list.STATES_PAR.notAddress.toString()
          }
          result.UnValidData.push(rows);
          continue;
        } else if (param[i].value == null || param[i].value == undefined || param[i].value == '') {
          console.log("5");
          result.UnValidData += 1;
          //对象保存 序号：数据
          let rows = {
            no: +param[i].no,
            address: param[i].address,
            value: param[i].value,
            state: Json_list.STATES_PAR.notValue.toString()
          }

          result.UnValidData.push(rows);
          continue;
        }
      }
      //02. 判断地址是否合法

      if (!web3.isAddress(param[i].address)) {
        console.log("423");
        //如果不是有效地址
        result.UnValid += 1;
        //对象保存 序号：数据
        let rows = {
          no: +param[i].no,
          address: param[i].address,
          value: param[i].value,
          state: Json_list.STATES_PAR.wrongAddress.toString()
        }
        result.UnValidData.push(rows);
        continue;
      } else {
        console.log("地址校验通过");
        //如果是有效地址
        result.Valid += 1;
        //对象保存 序号：数据
        let rows = {
          no: +param[i].no,
          address: param[i].address,
          value: param[i].value,
          state: Json_list.STATES_PAR.CheckPass.toString()
        }
        result.ValidData.push(rows);
        //分开追加数据
        result.sData.address.push( param[i].address);
        result.sData.value.push(  parseInt(param[i].value+'00000000'));
      }
      //数据处理完成后，返回参数
      //处理完标志
      result.State = 3;

    }


    return result;
  },

  //工具函数@ web3js验证地址是否是合法地址 (单个地址) 3021
  web_postisAddress:(data)=>{
    console.log("工具函数@web_postisAddress的参数是：",data.address);
    let result ={
      sState:0,
      sData:'',
      sBz:[]
    }

    let  cData  = data.address;
      if (web3.isAddress(cData)){

        result.sState = 2;
      }else{
        result.sState = 3;
      }
      return result;
  },

  //工具函数@ post 0121 处理大表单数据分片以及数据校验 4052
  web3_postVerifiCation_big: (data) => {
    //输出
    let param = data;
    // TODO: 单位
    let unitlength = 100000000;
    console.log("web3_postVerifiCation_big..................................");
    //结果处理对象
    let result = {
      State: 0, //0 1 3
      Tote: 0,
      Valid: 0,
      UnValid: 0,
      ValidData: [],
      UnValidData: [],
      Bz: [],
      sData:{
        address:[],
        value:[],
        state:[]
      }
    }
    //01. 判断数据是否为空

    //02. 判断地址和内容是否为空
/*    for (let i in param) {
      //01.首先判断2个参数都为空
      if ((param[i].A == null || param[i].address == undefined || param[i].address == '') && (param[i].value == null || param[i].value == undefined || param[i].value == '')) {
        //01.如果两位数据都是空
        result.UnValid += 1;
        //对象保存 序号：数据

        let rows = {
          no: +param[i].no,
          address: param[i].address,
          value: param[i].value,
          state: Json_list.STATES_PAR.notAddressandValue.toString()
        }
        // let cData = {i:param[i].no,param[i].address,param[i].value,Json_list.STATES_PAR.CheckPass}};
        result.UnValidData.push(rows);
        //
        continue;
      } else {
        console.log("411");
        //02. 判断地址为空的情况
        if (param[i].address == null || param[i].address == undefined || param[i].address == '') {
          //
          console.log("6");
          result.UnValid += 1;
          //对象保存 序号：数据
          let rows = {
            no: +param[i].no,
            address: param[i].address,
            value: param[i].value,
            state: Json_list.STATES_PAR.notAddress.toString()
          }
          result.UnValidData.push(rows);
          continue;
        } else if (param[i].value == null || param[i].value == undefined || param[i].value == '') {
          console.log("5");
          result.UnValidData += 1;
          //对象保存 序号：数据
          let rows = {
            no: +param[i].no,
            address: param[i].address,
            value: param[i].value,
            state: Json_list.STATES_PAR.notValue.toString()
          }

          result.UnValidData.push(rows);
          continue;
        }
      }
      //02. 判断地址是否合法

      if (!web3.isAddress(param[i].address)) {
        console.log("423");
        //如果不是有效地址
        result.UnValid += 1;
        //对象保存 序号：数据
        let rows = {
          no: +param[i].no,
          address: param[i].address,
          value: param[i].value,
          state: Json_list.STATES_PAR.wrongAddress.toString()
        }
        result.UnValidData.push(rows);
        continue;
      } else {
        console.log("地址校验通过");
        //如果是有效地址
        result.Valid += 1;
        //对象保存 序号：数据
        let rows = {
          no: +param[i].no,
          address: param[i].address,
          value: param[i].value,
          state: Json_list.STATES_PAR.CheckPass.toString()
        }
        result.ValidData.push(rows);
        //分开追加数据
        result.sData.address.push( param[i].address);
        result.sData.value.push(  parseInt(param[i].value+'00000000'));
      }
      //数据处理完成后，返回参数
      //处理完标志
      result.State = 3;

    }*/
    for (let i in param) {
     //01.首先判断2个参数都为空
     if ((param[i].A == null || param[i].A == undefined || param[i].A == '') && (param[i].B == null || param[i].B == undefined || param[i].B == '')) {
       //01.如果两位数据都是空
       result.UnValid += 1;
       //对象保存 序号：数据
       let rows = {
         no: i,
         address: param[i].A,
         value: param[i].B,
         state: Json_list.STATES_PAR.notAandB.toString()
       }
       // let cData = {i:param[i].no,param[i].A,param[i].B,Json_list.STATES_PAR.CheckPass}};
       result.UnValidData.push(rows);
       //
       continue;
     } else {
       //02. 判断地址为空的情况
       if (param[i].A == null || param[i].A == undefined || param[i].A == '') {
         result.UnValid += 1;
         //对象保存 序号：数据
         let rows = {
           no: i,
           address: param[i].A,
           value: param[i].B,
           state: Json_list.STATES_PAR.notAddress.toString()
         }
         result.UnValidData.push(rows);
         continue;
       } else if (param[i].B == null || param[i].B == undefined || param[i].B == '') {
         result.UnValidData += 1;
         //对象保存 序号：数据
         let rows = {
           no: i,
           address: param[i].A,
           value: param[i].B,
           state: Json_list.STATES_PAR.notValue.toString()
         }
         result.UnValidData.push(rows);
         continue;
       }
     }
     //02. 判断地址是否合法
     if (!web3.isAddress(param[i].A)) {
       console.log("第"+i+"合约地址不合法");
       //如果不是有效地址
       result.UnValid += 1;
       //对象保存 序号：数据
       let rows = {
         no: i,
         address: param[i].A,
         value: param[i].B,
         state: Json_list.STATES_PAR.wrongAddress.toString()
       }
       result.UnValidData.push(rows);
       continue;
     } else {
       // console.log("地址校验通过",i);
       //如果是有效地址
       result.Valid += 1;
       //对象保存 序号：数据
       let rows = {
         no: i,
         address: param[i].A,
         value: param[i].B,
         state: Json_list.STATES_PAR.CheckPass.toString()
       }
       result.ValidData.push(rows);
       //分开追加数据
       result.sData.address.push( param[i].A);
       // TODO: 转换参数
       let sNum = (parseFloat(param[i].B).toFixed(8))*unitlength;
       // let value = web3.toBigNumber(sNum);
       result.sData.value.push(sNum);
     }
     //数据处理完成后，返回参数
     //处理完标志
     result.State = 3;
   }

    return result;
  },

  web3_cuttingunitarray: (data) => {
    // TODO:切割因子
    console.log("开始切割数组......");
    // TODO: 分片大小，暂时给死
    let lengths = 200;
    let data_length = data.address.length;
    console.log("长度是",data_length);
    let arrbj = {
      no:0,
      address:"",
      value:""
    };//临时数组
    let arr_address =[];
    let arr_value = [];
    let arr_no = [];
    let brr = [];//返回数组

    //首先做一个判断，条数是否相等
    if (data.address.length != data.value.length){
        //如果两个参数数量不同，直接返回
        console.log("参数数量不同");
          return;
    }

    //数据处理
    for(let i=0;i<data_length;i++){
        //
        // console.log("循环",i);
          let is = i+1;
        if(is%lengths==0){
          //单位切割组装
          // TODO:
          //填充切割数组
          console.log("填装",i);
          brr.push({"address":arr_address,"value":arr_value});
          //清空临时数组
          arr_address = [];
          arr_value = [];
        }
        //捕捉最后一段数据
        if(data_length-lengths<lengths){
          //
          console.log("最后填装",i);
          brr.push({"address":arr_address,"value":arr_value});
          //清空临时数组
          arr_address = [];
          arr_value = [];
          break;
        }
        //
        //封装对象
        let rowdata = {"no":i,"address":data.address[i],"value":data.value[i]};//对象拼接方法，但是不能这样拼接，因为要拆成一串，所以要追加
        //追加
        arr_address.push(data.address[i]);
        arr_value.push(data.value[i]);
        //

        // arrbj.no += i;
        // arrbj.address=data.address[i];
        // arrbj.value = data.value[i];
        //
        }
        // console.log("切割后的数组是：=>",brr);
        return brr;
  },

  web3_currentProvider: (data) => {
    // TODO:
  }
}
//8.Actions_Contrant_Token=>skt测试代币的相关方法的实现(Token)
var Actions_Contrant_Token = {
  /*方法说明
   *@method T_transferFrom 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:_from(address),2:_value(uint256)}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  T_Test: async (data) => { //34531
    // TODO:
    let cData = data;
    console.log("调用合约方法-Token-T_Test...", cData.data);
    let parsm = cData.data;
    //参数
    let resultData ={
      Sum:0,
      Normal:0,
      Unnormal:0,
      Data:[],
      unData:[]
    }; //结果集
    let Parames_data = {
      Type: {
        param1: "address _form",
        param2: "address _to",
        param3: "uint256 _value"
      },
      Value: {
        param1: data.from,
        param2: data.to,
        param3: data.value
      }
    }
    // let data;
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    //循环处理
    for(let i=0;i<1;i++){
        //  序号 i
        //
        console.log("批量处理数据：",i);
        resultData.Sum+=1;//总量加一

        let Parames_row = {
          Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
          Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
          Tx_gasLimit: web3.toHex(90000),
          Tx_from: Parames_address.fromAddress,
          Tx_to: Parames_address.contractAddress,
          Tx_value: "0x0",
          //// TODO:
          Tx_data: Contract_Token.transfer.getData(parsm.ValidData[i].address,parsm.ValidData[i].value, {
            from: Parames_address.fromAddress
          })
        }
        //  05. 对接数据
        let rawTx = {
          nonce: Parames_row.Tx_nonce,
          gasPrice: Parames_row.Tx_gasPrice, // TODO:
          gasLimit: Parames_row.Tx_gasLimit,
          from: Parames_row.Tx_from,
          to: Parames_row.Tx_to,
          value: Parames_row.Tx_value, // TODO:
          data: Parames_row.Tx_data
        }
        // 06.签名编译
        let SignData = Actions_CommonTool.Tool_SignData({//3483
          rawTx: rawTx,
          key: Json_list.PRIVATEKEY.Drop_privateKey
        });
        result = await web3.eth.sendRawTransaction(SignData);
        //
          resultData.Normal+=1;//通过参数+1
          let  cData = {i:result}
          resultData.Data.push(cData);
    }
    console.log("----发送交易返回数据是：",result);
    return result;
  },
  T_Test_Batch: async (data) => { //34531
    // TODO:
    let cData = data;
    console.log("调用合约方法-Token-T_Test_Batch...", cData.data);
    let parsm = cData.data;
    //参数
    let resultData ={
      Sum:0,
      Normal:0,
      Unnormal:0,
      Data:[],
      unData:[]
    }; //结果集
    let Parames_data = {
      Type: {
        param1: "address _form",
        param2: "address _to",
        param3: "uint256 _value"
      },
      Value: {
        param1: data.from,
        param2: data.to,
        param3: data.value
      }
    }
    // let data;
    let Parames_address = {
      //合约地址
      contractAddress: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    //循环处理
    for(let i=0;i<1;i++){
        //  序号 i
        //
        console.log("批量处理数据：",i);
        resultData.Sum+=1;//总量加一
        //
        let Parames_row = {

          Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
          Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
          Tx_gasLimit: web3.toHex(200000),
          Tx_from: Parames_address.fromAddress,
          Tx_to: Parames_address.contractAddress,
          Tx_value: "0x0",
          //// TODO:
          Tx_data: Contract_Drop.multiSend.getData(parsm.sData.address,parsm.sData.value, {
            from: Parames_address.fromAddress
          })
        }
        //  05. 对接数据
        let rawTx = {
          nonce: Parames_row.Tx_nonce,
          gasPrice: Parames_row.Tx_gasPrice, // TODO:
          gasLimit: Parames_row.Tx_gasLimit,
          from: Parames_row.Tx_from,
          to: Parames_row.Tx_to,
          value: Parames_row.Tx_value, // TODO:
          data: Parames_row.Tx_data
        }
        // 06.签名编译
        let SignData = Actions_CommonTool.Tool_SignData({//3483
          rawTx: rawTx,
          key: Json_list.PRIVATEKEY.Drop_privateKey
        });
        result = await web3.eth.sendRawTransaction(SignData);
        //
          resultData.Normal+=1;//通过参数+1
          let  cData = {i:result}
          resultData.Data.push(cData);
    }
    console.log("----发送交易返回数据是：",result);
    return result;
  },
  /*方法说明
   *@method T_transferFrom 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:_from(address),2:_value(uint256)}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  T_transferFrom: async (data) => {
    // TODO:
    console.log("调用合约方法-Token-T_transferFrom...");
    //参数
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address _form",
        param2: "address _to",
        param3: "uint256 _value"
      },
      Value: {
        param1: data.from,
        param2: data.to,
        param3: data.value
      }
    }
    // let data;
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      //// TODO:
      Tx_data: Contract_Token.transferFrom.getData(Parames_address.fromAddress, Parames_address.toAddress, 1000000000, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Drop_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    return result;
  },
  /*方法说明
   *@method T_transfer 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:_to(address),2:_value(uint256)}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  T_transfer: async (data) => {
    // TODO:
    console.log("调用合约方法-Token-T_transfer...");
    //参数
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address _form",
        param2: "uint256 _value"
      },
      Value: {
        param1: data.from,
        param2: data.value
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Token.transfer.getData(Parames_address.fromAddress, Parames_address.toAddress, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Token_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    return result;
  },
  /*方法说明
   *@method T_balanceOf 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:_owner(address)}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  T_balanceOf: async (data) => {
    // TODO:
    console.log("3调用合约方法-Token-T_balanceOf........");
    //参数
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address _owner"
      },
      Value: {
        param1: data.owner,
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Token.balanceOf.getData(Parames_address.fromAddress, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Token_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    return result;
  },
  /*方法说明
   *@method T_approve 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:spender(address),2:value(uint256)}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  T_approve: async (data) => {
    // TODO:
    console.log("调用合约方法-Token-T_approve...");
    //参数
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address _spender",
        param2: "uint256 _value"
      },
      Value: {
        param1: data.spender,
        param2: data.value
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Token.approve.getData(Parames_address.fromAddress, Parames_data.Value.param2, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Token_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    return result;
  },
  /*方法说明
   *@method T_allowance 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:_owner(address),2:_spender(address)}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  T_allowance: async (data) => {
    // TODO:
    console.log("调用合约方法-Token-T_allowance...");
    //参数
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address _owner",
        param2: "address _spender"
      },
      Value: {
        param1: data.owner,
        param2: data.spender
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Token.allowance.getData(Parames_data.Value.param1, Parames_data.Value.param2, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Token_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    return result;
  }
}
//9.Actions_Contrant_Drop=> 空投合约的相关方法的实现(Drop)
var Actions_Contrant_Drop = {

  /*方法说明
   *@method D_setToken :设置代币种类  //设置代币
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_token(address)}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_setToken: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_setToken...",data);
    console.log("合约方法的初始化地址是3021:",data.data.address);
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address _token"
      },
      Value: {
        address:data.data.address
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.setToken.getData(Parames_data.Value.address, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Token_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    console.log("setToken :",result);
    return result;
  },
  /*方法说明
   *@method D_multiSendandself
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_destAddrs(address[],2:_valuesmyself(uint256[]),3:_valuesmyself(uint256))}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_multiSendandself: async (data) => {
    //参数
    console.log("调用合约方法-D_multiSendandself...");
    // TODO:

    let result = {}; //结果集,此封装成一个json,用于处理复杂业务
    result.cdata = Parames_data;
    let Parames_data = {

      Type: {
        param1: "address[] _destAddrs",
        param2: "uint256[] _values",
        param3: "uint256 _valuesmyself"
      },
      Value: {
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
        destAddrs: data.destAddrs,
        values: data.values,
        valuesmyself: data.valuesmyself
      }
    }

    // TODO:Data check
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //判断数据个数
    if (Parames_data.Value.destAddrs.length <= 0 || Parames_data.Value.values.length <= 0 || (Parames_data.Value.destAddrs.length == Parames_data.Value.values.length)) {
      //如果其中有一个是空,返回空
      result = "nill";
      return result;
    }
    //如果不为空，继续切割数据发送
    // let data;
    // TODO:
    let arr_lengths = Parames_data.Value.values.length;
    for (var i = 0; i < arr_lengths; i += 170) {
      //分批请求处理
      //01. 封装数据
      let Parames_row = {
        Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
        Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
        Tx_gasLimit: web3.toHex(90000),
        Tx_from: Parames_address.fromAddress,
        Tx_to: Parames_address.contractAddress,
        Tx_value: "0x0",
        // TODO:
        Tx_data: Contract_Drop.multiSendandself.getData(Parames_data.Value.param1.slice(i, i + 170), Parames_data.Value.param2.slice(i, i + 170), Parames_data.Value.param3, {
          from: Parames_address.fromAddress
        })
      }
      //02. 对接数据
      let rawTx = {
        nonce: Parames_row.Tx_nonce,
        gasPrice: Parames_row.Tx_gasPrice, // TODO:
        gasLimit: Parames_row.Tx_gasLimit,
        from: Parames_row.Tx_from,
        to: Parames_row.Tx_to,
        value: Parames_row.Tx_value, // TODO:
        data: Parames_row.Tx_data
      }
      //03. 获得交易签名数据
      let SignData = Actions_CommonTool.Tool_SignData({
        rawTx: rawTx,
        key: Json_list.PRIVATEKEY.Token_privateKey
      });
      // TODO:
      result.data[i] = await web3.eth.sendRawTransaction(SignData);
    }
    return result;
  },
  //

  /*方法说明
   *@method D_multiSend_ed 大文件操作
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_destAddrs(address[],2:_valuesmyself(uint256[]))}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_multiSend_ed: async (data) => {
    // TODO:
    let  result;
    let cData = data.data;
    let SignData;
    //参数
     let resultData ={
      Sum:0,
      Normal:0,
      Unnormal:0,
      Data:[],
      unData:[]
    };

    console.log("调用合约方法-Token-D_multiSend...", cData);
    let parsm = cData.data.sData;

    // console.log("D_multiSend的数据：length4323",parsm.address.length);
    // console.log("D_multiSend的数据：address4323",parsm.address);
    // console.log("D_multiSend的数据：value5878",parsm.value);

    // TODO: 数据分片
    let resusltData   =   Actions_Web3jsUtils.web3_cuttingunitarray(parsm);
    let lengths =  resusltData.length;
    // console.log("切割后的数组是===========>",resusltData.length);
    // console.log("切割后的数组是===========>",resusltData);
    // console.log("切割后的数组是===========>",resusltData[0].address);
    //  地址参数
    let Parames_address = {
      //合约地址
      contractAddress: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }

    //数据分片完成之后，然后正式对数据发送交易请求
    // for(let i=0;i<1;i++){
    //   //获取数据
    //   let  address_list = resusltData[i].address;
    //   let  value_list = resusltData[i].value;
    //   //封装数据
    //
    //   let Parames_row = {
    //     Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
    //     Tx_gasPrice: web3.toHex((web3.eth.gasPrice)*1.2),
    //     Tx_gasLimit: web3.toHex(800000),
    //     Tx_from: Parames_address.fromAddress,
    //     Tx_to: Parames_address.contractAddress,
    //     Tx_value: "0x0",
    //         //// TODO:
    //     Tx_data: Contract_Drop.multiSend.getData(address_list,value_list, {
    //     from: Parames_address.fromAddress
    //       })
    //   }
    //
    //   //对接数据
    //   let rawTx = {
    //     nonce: Parames_row.Tx_nonce,
    //     gasPrice: Parames_row.Tx_gasPrice, // TODO:
    //     gasLimit: Parames_row.Tx_gasLimit,
    //     from: Parames_row.Tx_from,
    //     to: Parames_row.Tx_to,
    //     value: Parames_row.Tx_value, // TODO:
    //     data: Parames_row.Tx_data
    //   }
    //
    //   //签名编译
    //    SignData = Actions_CommonTool.Tool_SignData({//签名
    //       rawTx: rawTx,
    //       key: Json_list.PRIVATEKEY.Drop_privateKey
    //     });
    //   // 获取签名数据,发送交易
    //   console.log("开始发送交易",i);
    //   // web3.eth.sendRawTransaction(SignData,(err,hash)=>{
    //   //     if (!err){
    //   //      console.log("返回的hash值是:",hash);
    //   //       }else{
    //   //      console.log("err",err);
    //   //       }
    //   //     });
    //        // result = await web3.eth.sendRawTransaction(SignData);
    //        // console.log("返回的hash是：",result);
    // };

        ///
        //获取数据
        let  address_list = resusltData[0].address;
        let  value_list = resusltData[0].value;
        //封装数据

        let Parames_row = {
          Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
          Tx_gasPrice: web3.toHex((web3.eth.gasPrice)*1.2),
          Tx_gasLimit: web3.toHex(800000),
          Tx_from: Parames_address.fromAddress,
          Tx_to: Parames_address.contractAddress,
          Tx_value: "0x0",
              //// TODO:
          Tx_data: Contract_Drop.multiSend.getData(address_list,value_list, {
          from: Parames_address.fromAddress
            })
        }

        //对接数据
        let rawTx = {
          nonce: Parames_row.Tx_nonce,
          gasPrice: Parames_row.Tx_gasPrice, // TODO:
          gasLimit: Parames_row.Tx_gasLimit,
          from: Parames_row.Tx_from,
          to: Parames_row.Tx_to,
          value: Parames_row.Tx_value, // TODO:
          data: Parames_row.Tx_data
        }

        //签名编译
         SignData = Actions_CommonTool.Tool_SignData({//签名
            rawTx: rawTx,
            key: Json_list.PRIVATEKEY.Drop_privateKey
          });
        // 获取签名数据,发送交易
        // console.log("开始发送交易",i);
        result = await web3.eth.sendRawTransaction(SignData);
         console.log("返回的hash是：",result);
        // web3.eth.sendRawTransaction(SignData,(err,hash)=>{
        //     if (!err){
        //      console.log("返回的hash值是:",hash);
        //       }else{
        //      console.log("err",err);
        //       }
        //     });
             // result = await web3.eth.sendRawTransaction(SignData);
             // console.log("返回的hash是：",result);
      return result;
  },

  //批量空投测试
  D_multiSend_Test:async(data)=>{
    //
    let  result;
    let cData = data;
    // let SignData;
    //参数
    //结果集
    //参数
    let resultData ={
      Sum:0,
      Normal:0,
      Unnormal:0,
      Data:[],
      unData:[]
    };
    // let data;
    let Parames_address = {
      //合约地址
      contractAddress: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    // console.log("调用合约方法-Token-D_multiSend_Test...", cData);
    let parsm = cData.data.sData;
    //
    let resusltData  = Actions_Web3jsUtils.web3_cuttingunitarray(parsm);
    let lengths = resusltData.length;
    //循环交易
    for(let i = 0;i<lengths;i++){
      //
      let  address_list = resusltData[i].address;
      let  value_list = resusltData[i].value;
      // console.log("address:",address_list);
      // console.log("value:",value_list);
      console.log("发送块:",i);
      //序列化数据
      let Parames_row = {
        Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)+1),
        Tx_gasPrice: web3.toHex((web3.eth.gasPrice)*10),
        Tx_gasLimit: web3.toHex(8000000),
        Tx_from: Parames_address.fromAddress,
        Tx_to: Parames_address.contractAddress,
        Tx_value: "0x0",
            //// TODO:
        Tx_data: Contract_Drop.multiSend.getData(address_list,value_list, {
        from: Parames_address.fromAddress
          })
      };
      //
      //  05. 对接数据
      let rawTx = {
        nonce: Parames_row.Tx_nonce,
        gasPrice: Parames_row.Tx_gasPrice, // TODO:
        gasLimit: Parames_row.Tx_gasLimit,
        from: Parames_row.Tx_from,
        to: Parames_row.Tx_to,
        value: Parames_row.Tx_value, // TODO:
        data: Parames_row.Tx_data
      }
          // 06.签名编译
      let SignData = Actions_CommonTool.Tool_SignData({//3483
            rawTx: rawTx,
            key: Json_list.PRIVATEKEY.Drop_privateKey
        });
          // result = await web3.eth.sendRawTransaction(SignData);
      web3.eth.sendRawTransaction(SignData,(err,hash)=>{
          if (!err){
                 console.log("hash-----------",i,hash);
           }else{
                 console.log("err",err);
          }
      });
      console.log("----发送交易返回数据是：",i,result);
      //sleep
      console.log('暂停中........60秒',i);
      await sleep(1000*60);
      console.log("继续开始...",i);
    }
      return result;
  },

  /*方法说明
   *@method D_multiSend
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_destAddrs(address[],2:_valuesmyself(uint256[]))}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_multiSend: async (data) => {
    // TODO:
    let  result;
    let cData = data;
    console.log("调用合约方法-Token-D_multiSend...", cData);
    let parsm = cData.data;
    console.log("D_multiSend的数据：address",parsm.sData.address);
    console.log("D_multiSend的数据：value",parsm.sData.value);

    //参数
    let resultData ={
      Sum:0,
      Normal:0,
      Unnormal:0,
      Data:[],
      unData:[]
    }; //结果集
    let Parames_data = {
      Type: {
        param1: "address _form",
        param2: "address _to",
        param3: "uint256 _value"
      },
      Value: {
        param1: data.from,
        param2: data.to,
        param3: data.value
      }
    }
    // let data;
    let Parames_address = {
      //合约地址
      contractAddress: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //序列化数据

    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(800000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
          //// TODO:
      Tx_data: Contract_Drop.multiSend.getData(parsm.sData.address,parsm.sData.value, {
      from: Parames_address.fromAddress
        })
    }

        //  05. 对接数据
        let rawTx = {
          nonce: Parames_row.Tx_nonce,
          gasPrice: Parames_row.Tx_gasPrice, // TODO:
          gasLimit: Parames_row.Tx_gasLimit,
          from: Parames_row.Tx_from,
          to: Parames_row.Tx_to,
          value: Parames_row.Tx_value, // TODO:
          data: Parames_row.Tx_data
        }
            // 06.签名编译
            let SignData = Actions_CommonTool.Tool_SignData({//3483
              rawTx: rawTx,
              key: Json_list.PRIVATEKEY.Drop_privateKey
            });
            // result = await web3.eth.sendRawTransaction(SignData);
             web3.eth.sendRawTransaction(SignData,(err,hash)=>{
                 if (!err){
                   console.log("hash-----------",hash);
                 }else{
                   console.log("err",err);
                 }
             })

            console.log("----发送交易返回数据是：",result);
            return result;
  },
  /*方法说明
   *@method D_multiSend2
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_destAddrs(address[],2:_values(uint256[]) )}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_multiSend2: async (data) => {
    //参数
    console.log("调用合约方法-D_multiSend2...");
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address[] _destAddrs",
        param2: "uint256[] _values"
      },
      Value: {
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
        param1: data.destAddrs,
        param2: data.values,
        param3: data.valuesmyself
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.multiSend2.getData(Parames_data.Value.param1, Parames_data.Value.param2, Parames_data.Value.param3, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Token_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    return result;
  },
  /*方法说明
   *@method D_multiself
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_multiself: async (data) => {
    //参数
    console.log("调用合约方法-D_multiSendandself...");
    let result; //结果集
    let Parames_data = {
      Type: {

        param1: "address[] _destAddrs",
        param2: "uint256[] _values",
        param3: "uint256 _valuesmyself"
      },
      Value: {
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.multiSendandself.getData(Parames_data.Value.param1, Parames_data.Value.param2, Parames_data.Value.param3, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Token_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    return result;
  },
  /*方法说明
   *@method D_settrustOwner 存入白名单
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_settrustOwner: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_settrustOwner...");
    let result; //结果集
    //
    let Parames_data = {
      Type: {
        param1: "address _ownaddress",
        param2: "string memory _owntext"
      },
      Value: {
        ownaddress: data.ownaddress,
        owntext: data.owntext
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.settrustOwner.getData(Parames_data.Value.ownaddress, Parames_data.Value.owntext, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Drop_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    return result;
  },
  /*方法说明
   *@method D_seterctypeName
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_seterctypeName: async (data) => {
    //参数
    console.log("调用合约方法-D_seterctypeName...");
    let result; //结果集
    let Parames_data = {
      Type: {

        param1: "address _tokentype",
        param2: "string[] _tokenName"
      },
      Value: {
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
        // param1:data.destAddrs,
        tokentype: data.tokentype,
        tokenName: data.tokenName
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.multiSendandself.getData(Parames_data.Value.tokentype, Parames_data.Value.tokenName, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Drop_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    //
    return result;
  },
  /*方法说明
   *@method D_sethistoricalOwner
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_sethistoricalOwner: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_sethistoricalOwner......");
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address _hisaddress",
        param2: "string _histext"
      },
      Value: {
        hisaddress: data.hisaddress,
        histext: data.histext
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.transfer.getData(Parames_data.Value.hisaddress, Parames_data.Value.histext, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.Drop_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    //
    return result;
  },
  /*方法说明
   *@method D_transfer
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_transfer: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_transfer......");
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address to",
        param2: "uint256 value"
      },
      Value: {
        to: data.to,
        value: data.value
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.transfer.getData(Parames_data.Value.to, Parames_data.Value.value, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.TokenMgr_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    //
    return result;
  },
  /*方法说明
   *@method D_approve
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_approve: async (data) => {
    //参数
    //参数
    console.log("调用合约方法-Token-D_approve......");
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address spender",
        param2: "uint256 value"
      },
      Value: {
        spender: data.spender,
        value: data.value
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.approve.getData(Parames_data.Value.spender, Parames_data.Value.value, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.TokenMgr_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    //
    return result;
  },
  /*方法说明
   *@method D_transferFrom
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
   */
  D_transferFrom: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_transferFrom...");
    let result; //结果集
    let Parames_data = {
      Type: {
        param1: "address from",
        param2: "address indexed to",
        param3: "uint256 value"
      },
      Value: {
        from: data.from,
        to: data.to,
        value: data.value
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.transferFrom.getData(Parames_data.Value.from, Parames_data.Value.to, Parames_data.Value.value, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.TokenMgr_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    //返回
    return result;
  },
  D_totalSupply: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_totalSupply...");
    let result; //结果集
    //
    let Parames_data = {
      Type: {
        //空
      },
      Value: {
        //nil
      }
      // TODO:
    }
    // let data;
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_TokenMgr.totalSupply.getData({
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.TokenMgr_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    //
    return result;
  },
  //闪电空投
  D_boltDrop: async (data) => {
    // TODO:
    let  result;
    let cData = data;
    console.log("调用合约方法-Token-D_boltDrop...", cData);
    let parsm = cData.data;
    console.log("D_multiSend的数据：address",parsm.address);
    console.log("D_multiSend的数据：value",parsm.value);
    // TODO: 切割数据

    //参数
    let resultData ={
      Sum:0,
      Normal:0,
      Unnormal:0,
      Data:[],
      unData:[]
    }; //结果集
    let Parames_data = {
      Type: {
        param1: "address _form",
        param2: "address _to",
        param3: "uint256 _value"
      },
      Value: {
        param1: data.from,
        param2: data.to,
        param3: data.value
      }
    }
    // let data;
    let Parames_address = {
      //合约地址
      contractAddress: "0x66A4F55B53Cfd0563a16F40BE7EDF8A07796F692",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //序列化数据

    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex((web3.eth.gasPrice)*1.2),
      Tx_gasLimit: web3.toHex(8000000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
          //// TODO:
      Tx_data: Contract_Drop.multiSend.getData(parsm.address,parsm.value, {
      from: Parames_address.fromAddress
        })
    }

        //  05. 对接数据
        let rawTx = {
          nonce: Parames_row.Tx_nonce,
          gasPrice: Parames_row.Tx_gasPrice, // TODO:
          gasLimit: Parames_row.Tx_gasLimit,
          from: Parames_row.Tx_from,
          to: Parames_row.Tx_to,
          value: Parames_row.Tx_value, // TODO:
          data: Parames_row.Tx_data
        }
            // 06.签名编译
            let SignData = Actions_CommonTool.Tool_SignData({//3483
              rawTx: rawTx,
              key: Json_list.PRIVATEKEY.Drop_privateKey
            });
            result = await web3.eth.sendRawTransaction(SignData);
             // web3.eth.sendRawTransaction(SignData,(err,hash)=>{
             //     if (!err){
             //       console.log("hash-----------",hash);
             //     }else{
             //       console.log("err",err);
             //     }
             // });

            console.log("----发送交易返回数据是：",result);
            return result;

  },
  D_balanceOf: async (data) => {
    //参数
    console.log("调用合约方法-Actions_Contrant_Drop-D_balanceOf...");
    let result; //结果集

    let Parames_data = {
      Type: {
        param1: "address who"
      },
      Value: {
        who: data.who
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.balanceOf.getData(Parames_data.Value.who, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.TokenMgr_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    //
    return result;
  }
}
//10.Actions_Contrant_TokenMgr=>项目之前空投合约的相关方法的实现(TokenMgr)
var Actions_Contrant_TokenMgr = {
  /*方法说明
   *@method M_prePare :将令牌发送到一个函数中的其他多个地址
   *@for Actions_Contrant_TokenMgr 所属
   *@param_rand随机索引，用于选择FlyDropToken契约地址
   *@param_From地址-您希望从地址发起
   *@param_value uint 256发送令牌的地址发送
   *@param_Token地址ERC 20令牌地址
   *@return {1:hash} 返回值说明
   */
  M_prePare: async (data) => {
    // TODO:
    //参数
    console.log("调用合约方法-TokenMgr-M_prePare......");
    let result; //结果集
    //参数结构
    let Parames_data = {
      Type: {
        param1: "uint256 _rand",
        param2: "address _from",
        param3: "address _token",
        param4: "uint256 _value"
      },
      Value: {
        param1: data.rand,
        param2: data.from,
        param3: data.token,
        param4: data.value
      }
    }
    // let data;
    // TODO:
    //地址
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice), // TODO:
      Tx_gasLimit: web3.toHex(90000), // TODO:
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0", // TODO:
      // TODO:
      Tx_data: Contract_TokenMgr.prepare.getData(
        Parames_data.Value.rand,
        Parames_data.Value.from,
        Parames_data.Value.token,
        Parames_data.Value.value, {
          from: Parames_address.fromAddress
        })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.TokenMgr_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    //08.  back
    return result;
  },

  /*方法说明
   *@method M_flyDrop :将令牌发送到一个函数中的其他多个地址
   *@for Actions_Contrant_TokenMgr 所属
   *@param_destAddrs将要发送令牌的地址发送
   *@param_value uint 256要发送的令牌数量
   *@return {1:hash} 返回值说明
   */
  M_flyDrop: async (data) => {
    // TODO:
    //参数
    console.log("调用合约方法-TokenMgr-M_flyDrop......");
    let result; //结果集
    //参数结构
    let Parames_data = {
      Type: {
        param1: "address[]  _destAddrs",
        param2: "uint256[]  _values"
      },
      Value: {
        destAddrs: data.destAddrs,
        values: data.values
      }
    }
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice), // TODO:
      Tx_gasLimit: web3.toHex(90000), // TODO:
      Tx_from: Parames_address.fromAddress, // TODO:
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0", // TODO:
      // TODO:
      Tx_data: Contract_Drop.flyDrop.getData(Parames_data.Value.destAddrs, Parames_data.Value.values, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
    let SignData = Actions_CommonTool.Tool_SignData({
      rawTx: rawTx,
      key: Json_list.PRIVATEKEY.TokenMgr_privateKey
    });
    //07.  发送
    result = await web3.eth.sendRawTransaction(SignData);
    //08.  back
    return result;
  }
}
//11.Actions_Configure=>项目相关配置信息()
var Actions_Configure = {
  Abi_Token: {

  },
  Abi_drop: {

  },
  Abi_TokenMgr: {

  }

}
//13.Actions_Commontool =>公共方法
var Actions_CommonTool = {

  Tool_SignData: (data) => {//3483
    //  01.封装对象
    let tx = new Tx(data.rawTx);
    //  02.序列化私钥
    let privateKey = Actions_Web3jsUtils.web3_bufferPrivateKey(data.key);
    //  03. 用私钥给数据签名
    tx.sign(privateKey);
    //  04. 对数据编码
    let serializeTx = '0x' + tx.serialize().toString('hex');
    //  05 返回
    return serializeTx;
  },
  Tool_bufferPrivateKey: (data) => {
    let key;
    switch (data.key) {
      case 'key_token':
        key = Actions_Web3jsUtils.web3_bufferPrivateKey(Json_list.PRIVATEKEY.Token_privateKey);
        break;
      case 'key_drop':
        key = Actions_Web3jsUtils.web3_bufferPrivateKey(Json_list.PRIVATEKEY.Drop_privateKey);
        break;
      case 'key_mgr':
        key = Actions_Web3jsUtils.web3_bufferPrivateKey(Json_list.PRIVATEKEY.TokenMgr_privateKey);
        break;
      default:
        key = "";
        break;
    }
    return key;
  },
  Tool_bufferPrivateKey11: () => {


  },
  //  Cancel the transaction if the current price of natural gas is too high
  Tool_gasHign: () => {


  }

}
//12.Json_list=>常量信息的相关管理(abi,合约地址,gas参数,等)
const Json_list = {
  ABI_TOKEN: [{
      "constant": false,
      "inputs": [{
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [{
        "name": "success",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [{
        "name": "success",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "_owner",
        "type": "address"
      }],
      "name": "balanceOf",
      "outputs": [{
        "name": "balance",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [{
        "name": "success",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [{
        "name": "remaining",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    }
  ],
  ADDRESS_TOKEN: '0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a',
  ABI_DROP: [{
      "constant": false,
      "inputs": [{
          "name": "spender",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_destAddrs",
          "type": "address[]"
        },
        {
          "name": "_values",
          "type": "uint256[]"
        },
        {
          "name": "_valuesmyself",
          "type": "uint256"
        }
      ],
      "name": "multiSendandself",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
        "name": "_token",
        "type": "address"
      }],
      "name": "setToken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "",
        "type": "address"
      }],
      "name": "historicalOwner",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "",
        "type": "address"
      }],
      "name": "snList",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "spender",
          "type": "address"
        },
        {
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "",
        "type": "address"
      }],
      "name": "erctypeName",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
        "name": "_owneraddress",
        "type": "address"
      }],
      "name": "deltrustOwner",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "",
        "type": "address"
      }],
      "name": "trustOwner",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_destAddrs",
          "type": "address[]"
        },
        {
          "name": "_values",
          "type": "uint256[]"
        }
      ],
      "name": "multiSend2",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_ownaddress",
          "type": "address"
        },
        {
          "name": "_owntext",
          "type": "string"
        }
      ],
      "name": "settrustOwner",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "owner",
        "type": "address"
      }],
      "name": "balanceOf",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "a",
        "type": "string"
      }],
      "name": "myself",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
          "name": "a",
          "type": "uint256"
        },
        {
          "name": "b",
          "type": "uint256"
        }
      ],
      "name": "add",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [{
        "name": "",
        "type": "address"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_tokentype",
          "type": "address"
        },
        {
          "name": "_tokenName",
          "type": "string"
        }
      ],
      "name": "seterctypeName",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "spender",
          "type": "address"
        },
        {
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_destAddrs",
          "type": "address[]"
        },
        {
          "name": "_values",
          "type": "uint256[]"
        }
      ],
      "name": "multiSend",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_values",
          "type": "uint256"
        },
        {
          "name": "addres_owner",
          "type": "address"
        }
      ],
      "name": "multiself",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
          "name": "owner",
          "type": "address"
        },
        {
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_hisaddress",
          "type": "address"
        },
        {
          "name": "_histext",
          "type": "string"
        }
      ],
      "name": "sethistoricalOwner",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    }
  ],
  ADDRESS_DROP: '0x7Dc6Dc91178a6fEF2Fa5Bd1de32c5642e6Ae421b',
  ABI_TOKENMGR: [],
  ADDRESS_TOKENMGR: "",
  PRIVATEKEY: {
    Token_privateKey: "F9B224ECF9161EEA3A815338FA70EF11F82AC1C5CAB145D264ADC1E110FA0907",
    TokenMgr_privateKey: "F9B224ECF9161EEA3A815338FA70EF11F82AC1C5CAB145D264ADC1E110FA0907",
    Drop_privateKey: "F9B224ECF9161EEA3A815338FA70EF11F82AC1C5CAB145D264ADC1E110FA0907",
    TEST: "123"
  },
  STATES_PAR: {
    notAddress: {
      status: "addressinull",
      msg: "地址为空"
    },
    notValue: {
      status: "valueisnull",
      msg: "数值为空"
    },
    notAddressandValue: {
      status: "notAddressandValue",
      msg: "地址数据都为空"
    },
    CheckPass: {
      status: "Check pass",
      msg: "数据通过校验"
    },
    wrongAddress: {
      status: "illegaladdress ",
      msg: "非法地址"
    }
  },
  //Limiting the number of cycles
  LIMITINGTHENUMBEROFCYCLES: {
    LM_100: 100,
    LM_150: 150,
    LM_180: 180,
    LM_200: 200,
    LM_240: 240,
    LM_000: 0
  },
  USE_ADDRESS: {
    User_1: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
    User_2: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1",
    User_3: "0xA9af645Ce31AF413b24a3b913f1a5Bf57A7a1C50",
    User_4: "0x3846a0e5e3a93900B5c0F8BA1504e0B55Ca201e5"
  }

};
//13.追加配置
const Json_Bz = {};
//二级启动
var Actions_Starting = {
  //init  web3, 合约对象
  init: () => {
    //
    Actions_initWeb3Provider.initWeb3();
    // Actions_initWeb3Provider.initContract_Token();
    Actions_initWeb3Provider.initContract_Drop();
  },
  //test 启动
  test: () => {
    console.log("log........");
  },
  log: () => {
    console.log("-");
  }
}
//一级启动
var Actions = {
  //Action 启动其它函数
  init: (data) => {
    Actions_Koa.render();
    Actions_Koa.user();
    //
    Actions_Router.router_get();
    Actions_Router.router_post();
    Actions_Starting.init();
    console.log(data);
  }
}
//启动
Actions.init("starting........");
