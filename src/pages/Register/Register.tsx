import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import taskManagerApi from '../../api/taskManagerApi';
import AuthService from '../../services/auth/authServices';

import { phone } from 'phone';
import countryCodes from 'country-codes-list';

interface CountryCode {
    value: string;
    name: string;
}
const countryCodesObject = countryCodes.customArray();

const RegisterPage = () => {
    // Use useHistory hook to get access to history object
    const navigate = useNavigate();

    // Use useState hook to manage username and password inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [mobile, setMobile] = useState('');
    const [country_code, setCountryCode] = useState('VN');
    const [email, setEmail] = useState('');

    // Handle errors
    const [error, setError] = useState(null);
    const [phoneInvalid, setPhoneInvalid] = useState('');
    // Get the login method from AuthService
    const login = async (values: any) => {
        await taskManagerApi
            .login(values)
            .then((res) => {
                console.log('login success');
                AuthService.setUser(res);
                navigate('/');
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    };

    // Define a handleSubmit function that calls login method and redirects on success
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!phoneInvalid) {
            // login({ username, password });
            console.log('sign up');
        }
    };

    useEffect(() => {
        if (mobile) {
            const { isValid } = phone(mobile, { country: country_code });
            if (!isValid) {
                setPhoneInvalid('Please enter a valid mobile number');
            } else {
                setPhoneInvalid('');
            }
        }
    }, [mobile, country_code]);
    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign up to join with us
                        </h2>
                    </div>

                    {error && (
                        <div className="mt-4 bg-rose-100 p-2 rounded-md text-rose-600 text-center transition hover:bg-rose-200 dark:bg-slate-700/[.3] dark:text-slate-200">
                            {error}
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div style={{ marginTop: '12px' }}>
                                <label htmlFor="username">Username</label>
                                <input
                                    name="username"
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <label htmlFor="First name">Firstname</label>
                                <input
                                    name="firstname"
                                    required
                                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    id="firstname"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <label htmlFor="middlename">Middlename</label>
                                <input
                                    name="middlename"
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    id="middlename"
                                    value={middlename}
                                    onChange={(e) => setMiddlename(e.target.value)}
                                />
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <label htmlFor="lastname">Lastname</label>
                                <input
                                    name="lastname"
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    id="lastname"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <label htmlFor="country_code">Mobile</label>

                                <div className="block w-full flex">
                                    <select
                                        name="country_code"
                                        id="country_code"
                                        className="w-[30%] relative block rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue="VN"
                                        onChange={(e) => setCountryCode(e.target.value)}
                                    >
                                        {countryCodesObject.map((countryCode: any) => (
                                            <option
                                                key={countryCode.value}
                                                value={countryCode.value}
                                            >
                                                {countryCode.name}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        name="mobile"
                                        required
                                        className="relative block w-[70%] rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="text"
                                        id="phone"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                </div>
                                {phoneInvalid && (
                                    <div className="text-rose-600">* {phoneInvalid}</div>
                                )}
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <label htmlFor="email">Email</label>
                                <input
                                    name="email"
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <label htmlFor="password">Password</label>
                                <input
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                Already have an account?{' '}
                                <a
                                    href="/login"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Sign in
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
