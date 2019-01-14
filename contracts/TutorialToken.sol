pragma solidity ^0.5.0;
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract TutorialToken is ERC20 {
  ERC20 internal erc20tk;
  address public owner;
  mapping (address =>string) public snList;
  mapping (address =>string) public historicalOwner;
  mapping (address =>string) public trustOwner;
  mapping (address =>string) public erctypeName;
//构造函数
constructor() public {
      /* _mint(msg.sender); */
      owner = msg.sender;
    }
//函数修饰器
  modifier onlyOwner(){
     require(msg.sender == address (owner));
      _;
    }
//实例化代币
    function setToken( address  _token) onlyOwner public{
        require(_token!= address(0));
        erc20tk = ERC20(_token);
     }

     //
  function  add(uint256 a,uint256 b) public pure returns (uint256){
    return a+b;
  }

  function  myself(string memory a) public pure returns (string memory){
    return a;
  }
//空投
function multiSendandself( address[] memory  _destAddrs,uint256[]  memory _values,uint256  _valuesmyself)onlyOwner public returns (uint256){
         require( _destAddrs.length == _values.length);
         erc20tk.transfer(owner,_valuesmyself);//transfer self
         uint256 i = 0;
         for(;i<_destAddrs.length;i = i.add(1)){
             if (!erc20tk.transfer(_destAddrs[i],_values[i])){
                 break;
             }
         }
         return (i);
     }
     //
function multiSend(address[]  memory _destAddrs, uint256[] memory _values) onlyOwner public returns (uint256) {
         require(_destAddrs.length == _values.length);
         uint256 i = 0;
         for (; i < _destAddrs.length; i = i.add(1)) {
             if (!erc20tk.transfer(_destAddrs[i], _values[i])) {
                 break;
             }
         }

         return (i);
     }

//空投 (不带合约地址)
function multiSend2( address[] memory  _destAddrs,uint256[]  memory _values)onlyOwner public returns (uint256){
         require( _destAddrs.length == _values.length);
         uint256 i = 0;
         for(;i<_destAddrs.length;i = i.add(1)){
             if (!erc20tk.transfer(_destAddrs[i],_values[i])){
                 break;
             }
         }
         return (i);
     }
//给自己代币
function multiself(uint256  _values,address  addres_owner)onlyOwner public returns (bool){
         require( _values >uint256(0));
         erc20tk.transfer(addres_owner,_values);
         return true;
     }
//存入 白名单
function settrustOwner(address  _ownaddress,string memory _owntext) public returns (bool){
          require(_ownaddress != address(0));
          // require(trustOwner[_ownaddress](""));
          trustOwner[_ownaddress] = _owntext;
          return true;
     }
//存入 合约记录
function seterctypeName(address _tokentype,string memory _tokenName) public returns (bool){
        require(_tokentype != address(0));
        erctypeName[address(_tokentype)] = _tokenName;
        return true;
     }

//存入历史纪录
function sethistoricalOwner(address  _hisaddress,string memory _histext) public returns (bool){

        require(_hisaddress != address(0));
        historicalOwner[_hisaddress] = _histext;
         return true;
     }
     //删除白名单
function deltrustOwner(address  _owneraddress)public returns(bool){
          require(_owneraddress != address(0));
          delete trustOwner[_owneraddress];
          return true;

      }
}
