import {HTTP} from '../common/utils/http'


class ChatModel extends HTTP {
    online(data) {
        return this.request({
            url:`/message/online`,
            method:'POST',
            data
        })
    }
    send(data) {
        return this.request({
            url:`/message/send`,
            method:'POST',
            data
        })
    }
    robot(data) {
        return this.request({
            url:`/message/robot`,
            method:'POST',
            data
        })
    }
}
export {
    ChatModel
}
