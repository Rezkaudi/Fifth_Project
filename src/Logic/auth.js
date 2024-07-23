import { Api } from '../Api/Api'

export const signUpUser = async (userData) => {
    try {
        const res = await fetch(`${Api}/signup/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${process.env.REACT_APP_ADMIN_TOKEN}`,
            },
            body: userData
        })
        const data = await res.json()
        if (res.ok) {
            return true
        }
        else {
            console.log(data)
            return false
        }
    }
    catch (err) {
        console.log(console.error(err))
    }
}

export const signInUser = async (UserData) => {
    try {
        const res = await fetch(`${Api}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${process.env.REACT_APP_ADMIN_TOKEN}`,

            },
            body: JSON.stringify(UserData)
        })

        const data = await res.json()
        if (res.ok) {
            localStorage.setItem('userToken', data.token)
            return true
        }
        else {
            console.log(data.non_field_errors[0])
            return false
        }
    }
    catch (err) {
        console.log(console.error(err))
    }
}

export const generateToken = async (tokenData) => {
    const userToken = localStorage.getItem('userToken')

    try {
        const res = await fetch(`${Api}/signup2/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${userToken}`,
            },
            body: JSON.stringify(tokenData)
        })
        const data = await res.json()
        if (res.ok) {
            return data.token
        }
        else {
            console.log(data)
            return data
        }
    }
    catch (err) {
        console.log(console.error(err))
    }
}