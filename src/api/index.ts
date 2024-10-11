import { secret } from '@aws-amplify/backend'
import axios from 'axios'

const headers: any = { 'X-Auth-Token': secret('X-Auth-Token') }


const getScanlog = async ( setScanlog: any )=> {
    const response: any = await axios.get('https://ssav.flexrentalsolutions.com/f5/api/scan-log/scan-history?page=0&size=20&sort=scanDate%2Cdesc', headers)

    // setScanlog(response.data.content)

}

const getBackupHistory = async ()=> {
    const response = await axios.get('https://ssav.flexrentalsolutions.com/f5/api/backup-history', headers)
    console.log(response)
}


const api = {
    getScanlog,
    getBackupHistory
}
export default api
