import React from 'react'
import './Navbar1.css'

const Navbar1 = () => {
    return (
        <nav className=''>
            <div className=" navbar1 p-14">
                <div className="flex items-center space-x-4 gap-6 ">
                    <a href="#" className="text-purple-600 font-semibold">Dashboard</a>
                    <span className="text-gray-600">Task list</span>
                </div>
                <button className="custom-button ">Sign out</button>
            </div>
        </nav>
    )
}

export default Navbar1