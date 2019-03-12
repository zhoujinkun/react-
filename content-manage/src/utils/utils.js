//公共机制

export default {
    // 封装时间
    formateDate(time){
        if(!time) return;
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        hour=hour<10?`0${hour}`:`${hour}`
        let min = date.getMinutes();
        min=min<10?`0${min}`:`${min}`
        let seconds = date.getSeconds();
        seconds=seconds<10?`0${seconds}`:`${seconds}`
        return `${year}-${month}-${day} ${hour}:${min}:${seconds}`
    },
    //封装分页 基本上都是antd中分页组件的属性
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true 
        }
    }
}