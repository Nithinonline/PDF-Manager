import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { server } from '../../server';

const Form = () => {

    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault()
        
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        };

        const newForm = new FormData();
        newForm.append('file', file);
        newForm.append('title', title);
        console.log("Clicked")

        axios
            .post(`${server}/add/65edcf0832bd8760f842b93a`, newForm, config)
            .then((res) => {
               console.log(res.data)
               toast.success("PDF uploaded successfully")
            })
            .catch((err) => {
                console.log(err)

            });
    };


    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    console.log(title, file)

    return (
        <div className="bg-slate-300 dark:bg-gray-800 p-6 rounded-md shadow-md w-full md:w-2/3 lg:w-1/2 mx-auto mt-10 ">
        <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PDF Title</label>
        <input
          type="text"
          id="title"
          aria-describedby="helper-text-explanation"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
        />
      
        <label htmlFor="file-input" className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
        <label htmlFor="file-input" className='flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-750 bg-white hover:bg-gray-50 cursor-pointer'>
          <span>Select a PDF </span>
          <input type="file" name='file' id='file-input' accept='.pdf' onChange={handleFileInputChange} className='sr-only' />
        </label>
      
        <button
          type="button"
          className="text-white bg-blue-700 mt-6 md:mt-10 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={(e) => handleSubmit(e)}
        >
          Upload
        </button>
      </div>
      
    )
}

export default Form