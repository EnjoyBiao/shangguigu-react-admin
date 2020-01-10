/**
 * 使用第三方库，兼容性好https://github.com/marcuswestin/store.js
 * */
import store from 'store'
const USER_KEY = 'user_key';
export default {
    /**
     * 保存user信息
     * **/
    saveUser(user) {
        //localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    /**
     * 读取
     * */
    getUser() {
        //return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },
    /**
     * 删除
     * */
    removeUser() {
        //localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}

