/**
 * 包含引用中所有接口请求函数
 * 返回的是一个promise
 * */
import ajax from './ajax'
/**
 * 登录
 * */
export const reqLogin=(username,password)=> ajax('/login',{username,password},'POST')
