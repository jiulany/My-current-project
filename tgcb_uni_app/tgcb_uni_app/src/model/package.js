import {HTTP} from '../common/utils/http'


class PackageModel extends HTTP {
    getPackageInfo(data) {
        return this.request({
            url: '/package/details/' + data.id
        })
    }
    
}
export {
    PackageModel
}
