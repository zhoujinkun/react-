//公共机制

export default {
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
    }
}