import axios from 'axios'


export function sendData(symbol){
    return dispatch=>{
        axios({
            method:'post',
            url:'/',
            data:symbol
        }).then((res)=>{
            dispatch({type:'EXISTS', payload:res.data})
    
        })
    }
   
}

export function storeData(data){
    return dispatch=>{
     
        const confi = data.data.map((data)=>{
            return [new Date(data[0]).getTime(), data[4]];
        })
        const config = {
            name:data.name,
            data:confi
        }
        
        console.log(data)
        dispatch({type:'STOCK_DATA',payload:{
            symbol:data.dataset_code,
            config:config
        }})
    }
}

export function init(){
    return dispatch=>{
        axios({
            method:'get',
            url:'/getStocks'
        }).then((res)=>{
            
            const data = res.data.map((data)=>{
                const confi = data.data.map((data)=>{
                    return [new Date(data[0]).getTime(), data[4]];
                })
                console.log(res.data)
                return {
                    name:data.name,
                    data:confi
                }
                
            })
            const symbols = res.data.map((data)=>{
                return data.dataset_code
            })
            dispatch({type:'INIT',payload:{
                data:data,
                symbol:symbols
                

            }})
        })
    }
}

export function deleteStock(symbol, payload){

    return dispatch =>{
        axios({
            method:'delete',
            url:'/deleteStock',
            data:symbol
        })
        console.log(symbol,payload)
        dispatch({type:'DELETE_STOCK',payload:payload})
    }
   




}
    
