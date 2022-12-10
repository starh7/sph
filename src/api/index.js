import requests from "./request";
import mockReq from "./mockReq"

// 获取三级联动的数据
export const getContainList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取banner数据
export const getBannerList = () => mockReq({ url: '/banner', method: 'get' })

// 获取floor数据
export const getFloorList = () => mockReq({ url: '/floor', method: 'get' })

// 获取search搜索数据
export const getSearchList = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取商品详情信息

export const getDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: 'get', data: skuId })

// 添加到购物车
export const getAddToCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post', data: { skuId, skuNum } })

// 获取购物车列表
export const getShopCartList = ()=>requests({url:'/cart/cartList',method:'GET'})

// 删除购物车商品请求
export const getDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:"DELETE",data:skuId})

// 切换商品选中状态
export const getCheckCart = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码请求  /user/passport/sendCode/phone
export const getSendCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get',data:phone})

// 请求注册 /api/user/passport/register
export const getRegister = (data)=>requests({url:'/user/passport/register',method:'post',data})

// 登入接口 /api/user/passport/login
export const getLogin = (data)=>requests({url:'/user/passport/login',method:'post',data})

// 获取用户信息
export const getUserInfo = ()=>requests({url:"/user/passport/auth/getUserInfo",method:'get'})

// 退出登入
export const getLogout = ()=>requests({url:"/user/passport/logout",method:'get'})

// 获取用户地址
export const getUserAddress = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单交易页面信息   /order/auth/trade
export const getOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

// 提交订单  /order/auth/submitOrder?tradeNo={tradeNo}
export const getSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取订单交易页面信息  /order/auth/trade
export const getTradeInfo = ()=>requests({url:'/order/auth/trade',method:'get'}) 

// 获取订单支付信息   /payment/weixin/createNative/{orderId}
export const getCreateNative = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 查询订单支付状态   /payment/weixin/queryPayStatus/{orderId}
export const getPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})

// 获取我的订单列表  /order/auth/{page}/{limit}
export const getMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})

