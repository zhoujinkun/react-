/** 
 * 存储数据方法的
 */

 import {createStore} from 'redux'

 import reducer from '../reducer/reducer';
// 引入调试工具
//  import {composeWithDevTools} from 'redux-devtools-extension';
const initialState = {
    menuName: ''
}
const Store = ()=>createStore(reducer,initialState)
 export default Store;