import React from 'react'

const Navbar = () => {
    return (
        <div>

            <nav className="bg-[#BF3131] border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="./logo.png" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold text-[#F3EDC8] whitespace-nowrap dark:text-white">PDF-Manager</span>
                    </a>                
                    
                </div>
            </nav>

        </div>
    )
}

export default Navbar