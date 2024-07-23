import { Api } from "../Api/Api" 

export const fetchUserData = async () => {
    try {
        const res = await fetch(`${Api}/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem("userToken")}`,
            }
        })
        const data = await res.json()
        return data
    }
    catch (err) {
        console.log(console.error(err))
    }
}