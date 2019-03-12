import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {
    static ajax(options){
        // 请求数据的时候加载loading
        let loading;
        if(options.data && options.data.isShowloading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display="block";
        }
        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
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