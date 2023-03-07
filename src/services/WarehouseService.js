import http from '../http-common';

const getCapacity = () => {
    return http.get('/currentcapacity');
}

const getFreeBox = () => {
    return http.get('/getallfreebox');
}

const appendNewBox = (shedid,body) => {
    return http.post(`/appendnewbox/${shedid}`,body)
}

const takeBox = (shedid,body) => {
    return http.patch(`/takebox/${shedid}`,body)
}

const appendBox = (shedid,body) => {
    return http.patch(`/appendbox/${shedid}`,body)
}

const deleteBox = (shedid,boxid) => {
    return http.delete(`/deletebox/${shedid}/${boxid}`)
}

const warehouseService = {
    getCapacity,
    getFreeBox,
    appendNewBox,
    takeBox,
    appendBox,
    deleteBox
}

export default warehouseService;