import { Api } from "../Api/Api";

export const getUserProjects = async () => {
    const userToken = localStorage.getItem('userToken')

    try {
        const res = await fetch(`${Api}/user-projects/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${userToken}`,
            }
        })

        const data = await res.json()
        console.log(data)

        if (res.ok) {
            return data
        }
        else {
            return undefined
        }
    }
    catch (err) {
        console.log(console.error(err))
    }
}

export const createNewProject = async (projectData) => {

    console.log(projectData)
    const userToken = localStorage.getItem('userToken')

    try {
        const res = await fetch(`${Api}/user-projects/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${userToken}`,
            },
            body: projectData
        })

        if (res.ok) {
            return true
        }
        else {
            return false
        }
    }
    catch (err) {
        console.err(err)
    }
}

export const deleteProject = async (id) => {
    const userToken = localStorage.getItem('userToken')

    try {
        const res = await fetch(`${Api}/edit-project/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${userToken}`,
            }
        })

        // const data = await res.json()

        if (res.ok) {
            return true
        }
        else {
            return false
        }
    }
    catch (err) {
        console.log(console.error(err))
    }
}