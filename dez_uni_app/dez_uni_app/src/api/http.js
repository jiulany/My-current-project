export const base_url="https://dezhuang.tuogouchebao.com/"  //192.168.31.211:8002 192.168.31.156:8008 //https://dezhuang.tuogouchebao.com
export default function http(val,upl) {
    return new Promise((resolve,reject)=>{
        let a=val
        a.url=base_url+a.url
        if(uni.getStorageSync('skey')){
            a.header={"X-WX-Skey":uni.getStorageSync('skey')}
        }
        if(!upl){
            console.log(a)
            uni.request({
            ...a,
            success:function (res) {
                if(res.data.code===200){
                    resolve(res.data)
                }else{
                    reject(res.data)
                }
            }
            })
        }else{
            console.log(a)
            uni.uploadFile({
                ...a,
                success:function (res) {
                    let a=res.data
                    let b=JSON.parse(a)
                    if(b.code===200){
                        resolve(b)
                    }else{
                        reject(b)
                    }
                }
                }) 
        }
    })
}