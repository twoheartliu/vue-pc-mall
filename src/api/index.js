import requests from './ajax'
import mockRequests from './mockAjax'

// 三级联动的接口
export const getCategoryList = () =>
  requests.get('/product/getBaseCategoryList')

// mock banner 接口
export const getBannerList = () => mockRequests.get('/banner')

// mock floor 接口
export const getFloorList = () => mockRequests.get('/floor')

// 产品搜索列表
// params 默认参数，应当是一个空对象，否则报错
// 当参数是空对象时，返回所有 items
export const postSearchList = (params) =>
  requests({
    url: '/list',
    method: 'post',
    data: params,
  })

// 商品详情
export const getItemDetail = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: 'get',
  })

// 添加到购物车或对购物车商品数量进行修改
export const postAddToCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  })

// 购物车列表
export const getCartList = () =>
  requests({
    url: `/cart/cartList`,
    method: 'get',
  })

// 删除购物车物品
export const deleteCart = (skuId) =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
  })

// 切换商品选中状态
export const getCheckCart = ({ skuId, isChecked }) =>
  requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get',
  })
