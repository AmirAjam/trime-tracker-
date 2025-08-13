import React from 'react'

const AuthInput = React.forwardRef(({ placeholder, type = "text", ...rest }, ref) => (
    <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
        className="w-full bg-dark outline-0 p-3 rounded-lg mt-5 first:mt-0 border border-dark
             focus:border-gray-300" />
));
export default AuthInput