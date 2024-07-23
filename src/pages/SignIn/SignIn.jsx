import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../component1/Buttons/Button'
import H1 from '../../component1/H1'
import Link1 from '../../component1/Link1'
import { useDispatch } from 'react-redux'
import LoginImage from '../../assets/images/Login.png'
import { signIn } from '../../features/user/handleRequests'

function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const [validation, setvalid] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handelLogin = async (e) => {
        e.preventDefault()
        let data = { username, password }
        console.log("data input", data)

        dispatch(signIn(data)).unwrap().then(
            () => {
                navigate('/account')
            },
            (error) => {
                console.error("Failed to sign in:", error);
            }
        );

    }
    return (
        <div className='h-screen bg-blue1'>
            <div className="grid lg:gap-6 lg:grid-cols-2 h-full">
                <div className="w-full content-center text-center place-content-center">
                    <img
                        className="mx-auto mt-10 w-auto"
                        src={LoginImage}
                        alt="Your Company"
                    />
                </div>
                <div className="lg:h-[95%] w-full text-center place-items-center bg-gray1 rounded-bl-2xl rounded-tl-2xl">
                    <div className='place-items-center p-8 justify-center'>
                        <H1 h1='Login Your Account' />
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handelLogin}>
                                <div>
                                    <label htmlFor="Username" className="flex text-sm font-medium leading-6 text-input">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="Username"
                                            name="Username"
                                            value={username}
                                            onChange={(e) => { setUsername(e.target.value) }}
                                            onMouseDown={(e) => { setvalid(true) }}
                                            type="text"
                                            autoComplete="text"
                                            placeholder='Enter youe username here'
                                            required
                                            className="block w-full rounded-lg border-0 py-1.5 px-5 text-input shadow-sm  placeholder:text-black/40 bg-placeholder/40 sm:text-sm sm:leading-6"
                                        />
                                        {
                                            username.length === 0 && validation &&
                                            <span className='text-red1 flex text-sm mt-2 ' >Field is required</span>
                                        }
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6  text-input">
                                            Password
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => { setpassword(e.target.value) }}
                                            onMouseDown={(e) => { setvalid(true) }}
                                            type="password"
                                            placeholder='Enter youe password here'
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-lg border-0 py-1.5 px-5  text-input shadow-sm  placeholder:text-black/40 bg-placeholder/40 sm:text-sm sm:leading-6" />

                                        {
                                            password.length === 0 && validation &&
                                            <span className='text-red1 flex text-sm mt-2 ' >Field is required</span>
                                        }
                                    </div>
                                </div>

                                <Button name="Login" />

                                <div>
                                    <p className="mt-10 text-center text-input/50 text-lg leading-9 tracking-tight">
                                        - OR -
                                    </p>
                                    <p className="mt-10 text-center text-sm text-input">
                                        create an account?{' '}
                                        <Link1 Nlink="Sign-up" route="/signup" />
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn