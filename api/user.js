import axios from 'axios';

const endPoint = 'http://192.168.1.5:3000/api/v1/stories';

const getStories = async (token) => {
    try {
        const res = await axios({
            method: 'GET',
            url: endPoint,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (res.data.status === 'success') return res.data
    } catch (err) {
        return { status: 'fail', message: err.response.data.message }
    }
}

export default {
    getStories
}