/**
 * reducer 数据处理
  */
 import {type} from '../action/action';
//初始化状态
const initialState = {
    menuName:"首页"        
}

export default (state=initialState,action)=>{
    switch(action.type){
        case type.SWITCH_MENU:
            return {
                ...state, //保存原来的状态
                menuName:action.menuName //赋值新的
            }
            
        default: 
            return state;
           
    }
}