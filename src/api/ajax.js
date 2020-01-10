/**
 * 封装axios库
 * 返回promise
 * */
import axios from  'axios'
import {message} from "antd";

export default  function  ajax(url,data={},type='GET') {
      return new Promise((resolve,reject)=>{
          let promise;
          if (type=='GET') {
              promise=axios.get(url, {params:data,})
          }else if(type=='POST'){
              promise=axios.post(url,data)
          }
          promise.then((res)=>{
              resolve(res.data)
          }).catch((err)=>{
              message.error('请求错误:'+err.message)
          })
      })
}
