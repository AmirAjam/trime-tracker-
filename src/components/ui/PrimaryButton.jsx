import React from 'react'

const PrimaryButton = ({type}) => {
    return (
        <button type={type ? type : "button"} className="bg-green-primary w-full py-2 rounded-lg text-white cursor-pointer 
        hover:bg-green-800 duration-300">ورود</button>
    )
}

export default PrimaryButton