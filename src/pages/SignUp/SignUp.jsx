
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import H1 from '../../component1/H1'
import Button from '../../component1/Buttons/Button'
import Link1 from '../../component1/Link1'

import SignUpImage from '../../assets/images/singup.png'

import { useDispatch } from 'react-redux'
import { signUp } from '../../features/user/handleRequests'

function SignUp() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [profile_picture, setProfilePicture] = useState(null)
    const dispatch = useDispatch()

    const [validation, setvalid] = useState(false)
    const first_name = ""
    const last_name = ""
    const navigate = useNavigate()

    const handelSignUp = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        formData.append('email', email)
        formData.append("first_name", first_name)
        formData.append("last_name", last_name)
        formData.append("profile_picture", profile_picture)
        console.log("data input", formData)
        dispatch(signUp(formData)).unwrap().then(
            () => {
                navigate('/signin')
            },
            (error) => {
                console.error("Failed to sign up:", error);
            }
        );
    }

    return (
        <div className='h-screen bg-blue1'>
            <div className="grid lg:gap-6 lg:grid-cols-2 h-full">
                <div className="w-full text-center place-items-center bg-gray1 ">
                    <div className='place-items-center p-8 justify-center '>
                        <H1 h1='Create Your Account' />
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-5" onSubmit={handelSignUp}>
                                <div>
                                    <label htmlFor="Name" className="flex text-sm font-medium leading-6 text-input">
                                        Username
                                    </label>
                                    <input
                                        onMouseDown={(e) => setvalid(true)}
                                        id="Name"
                                        name="Name"
                                        value={username}
                                        onChange={(e) => { setusername(e.target.value) }}
                                        type="Name"
                                        autoComplete="Name"
                                        placeholder='Enter youe username here'
                                        required
                                        className=" block w-full rounded-lg border-0 py-1.5 px-5 text-input shadow-sm  placeholder:text-black/40 bg-placeholder/40 sm:text-sm sm:leading-6"
                                    />
                                    {
                                        username.length === 0 && validation &&
                                        <span className='text-red1 flex text-sm mt-2 ' >Field is required</span>
                                    }
                                </div>

                                <div>
                                    <label htmlFor="email" className="flex text-sm font-medium leading-6 text-input">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => { setemail(e.target.value) }}
                                        type="email"
                                        autoComplete="email"
                                        placeholder='Enter youe email here'
                                        required
                                        className=" block w-full rounded-lg border-0 py-1.5 px-5 text-input shadow-sm  placeholder:text-black/40 bg-placeholder/40 sm:text-sm sm:leading-6"
                                    />

                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6  text-input">
                                            Password
                                        </label>

                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => { setpassword(e.target.value) }}
                                        type="password"
                                        placeholder='Enter youe password here'
                                        autoComplete="current-password"
                                        required
                                        className=" block w-full rounded-lg border-0 py-1.5 px-5  text-input shadow-sm  placeholder:text-black/40 bg-placeholder/40 sm:text-sm sm:leading-6" />

                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="image" className="block text-sm font-medium leading-6  text-input">
                                            Image
                                        </label>

                                    </div>
                                    <input
                                        id="image"
                                        name="image"
                                        onChange={(e) => { setProfilePicture(e.target.files[0]) }}
                                        type="file"
                                        placeholder='upload youe image here'
                                        required
                                        className=" block w-full rounded-lg border-0 py-1.5 px-5  text-input shadow-sm  placeholder:text-black/40 bg-placeholder/40 sm:text-sm sm:leading-6" />
                                </div>

                                <Button name="Sign-Up" />

                                <div>
                                    <p className="mt-10 text-center text-input/50 text-lg leading-9 tracking-tight">
                                        - OR -
                                    </p>
                                    <p className="mt-10 text-center text-sm text-input">
                                        Already have an account?{' '}
                                        <Link1 Nlink="Login" route="/signin" />
                                    </p>
                                </div>
                            </form>


                        </div>
                    </div>

                </div>
                <div className="w-full content-center text-center place-content-center bg-blue1">
                    <img
                        className="mx-auto mt-10 w-auto"
                        src={SignUpImage}
                        alt="Your Company"
                    />
                </div>


            </div >
        </div >
    )
}

export default SignUp