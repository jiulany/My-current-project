
export const base_url="https://propertyapi.tuogouchebao.com/" //https://propertyapi.tuogouchebao.com http://192.168.31.167:8001/
export default function http(val,upl) {
    return new Promise((resolve,reject)=>{
        let a=val
        a.url=base_url+a.url
        if(a.data.community_id){
            
        }else{
            a.data.community_id=uni.getStorageSync('community_selected')&&uni.getStorageSync('community_selected').community_id
        }
        if(uni.getStorageSync('skey')){
            a.header={"X-WX-Skey":uni.getStorageSync('skey')}
        }
        if(!upl){ 
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