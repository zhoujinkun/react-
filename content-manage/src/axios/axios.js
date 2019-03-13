import axios from 'axios';
import { Modal } from 'antd';
import utils from '../utils/utils';
export default class Axios {
    static requestList(params,url,_this,isMock){
        let data = {
            params:params,
            isMock
        }
        this.ajax({
            url:url,
            data:data,
        }).then((res)=>{
           if(res && res.result){
                //注意this指向
            _this.setState({
                dataSource:res.result.item_list.map((item,index)=>{
                    //直接返回带有key的数组
                    item.key = index;
                    return item;
                }),
                pagination:utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
           }
        })
    }
    static ajax(options){
        // 请求数据的时候加载loading
        let loading;
        if(options.data && options.data.isShowloading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display="block";
        }


        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        //判断是否是mock数据
        /* if(options.isMock){
            baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'; //mock假数据
        }else{
            baseApi = '';  //真正的接口数据地址
        } */
         
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                baseURL:baseApi,
                // timeout:5000,
                method:'get',
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                if(response.status == '200'){
                    // 加载成功后Loading消失
                    if(options.data && options.data.isShowloading !== false){
                        loading.style.display = 'none';
                    }
                    let res = response.data;
                    console.log(res)
                    if(res.code == 0){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.msg
                        });
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}  