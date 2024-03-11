import React, { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf';
import PdfComponent from '../PdfComponent/PdfComponent';
import axios from 'axios';
import { server } from '../../server';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();


const Cards = () => {

    const [pdf, setPdf] = useState([])
    const [pdfPath, setPdfPath] = useState(null)
    const [user, setUser] = useState(null)


    //setting user deatils in local storage
    useEffect(() => {
        const data = localStorage.getItem('user');
        const userData = JSON.parse(data);
        setUser(userData);
      }, []);
    

      //get request to get pdf data
      useEffect(() => {
        const sendReq = async () => {
          try {
            if (user) {
              const response = await axios.get(`${server}/getUser/${user._id}`);
              console.log(response.data);
              setPdf(response.data.pdf)
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        sendReq();
      }, [user]);
    

      const showPdf=(pdf)=>{
        setPdfPath(`http://localhost:4200/uploads/${pdf}`)
      }
    



    return (
        <>
            <h1 className='flex justify-center mt-[10vh] text-[30px]'>Your PDF's</h1>
            <div className='flex flex-wrap justify-center  mt-10 items-center'>



                {
                    pdf.map((item,index) => (
                        <div key={index} className="max-w-sm m-2 w-[200px] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg w-[100px] mt-3" src="./pdficon.png" alt="" />
                            </a>
                            <div className="p-5 flex flex-col items-center justify-center">

                                <h5 className="mb-2 text-xl font-300 tracking-tight text-gray-800 dark:text-white">{item.title}</h5>


                                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={()=>showPdf(item.PDFdata)}
                                >
                                    View PDF
                                </button>
                            </div>
                        </div>
                    ))
                }

            </div>

            <div className='flex justify-center mx-auto
              bg-slate-300 w-[70%] mt-[10vh] '>
                <PdfComponent pdfPath={pdfPath} />
            </div>
        </>
    )
}

export default Cards