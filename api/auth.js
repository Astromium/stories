import axios from 'axios'

const endPoint = 'http://192.168.1.5:3000/api/v1/users';

const signUp = async (name, email, password, passwordConfirm) => {

    try {
        const res = await axios({
            method: 'POST',
            url: `${endPoint}/signup`,
            data: { name, email, password, passwordConfirm }
        })
        if (res.data.status === 'success') {
            return res.data
        }
    } catch (err) {
        return { status: 'fail', message: err.response.data.message }
    }

}

//TODO handle the login errors

const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${endPoint}/login`,
            data: { email, password }
        })
        if (res.data.status === 'success') {
            return res.data
        }
    }

    catch (err) {
        console.log(err)
    }

}

export default {
    signUp,
    login
}