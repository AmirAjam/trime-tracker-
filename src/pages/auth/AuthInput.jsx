import React from 'react'

const AuthInput = ({ placeholder }) => {
    return (
        <input type="text" placeholder={placeholder}
            className="w-full bg-dark outline-0 p-3 rounded-lg mt-5 first:mt-0 border border-dark
             focus:border-gray-300" />
    )
}

export default AuthInput