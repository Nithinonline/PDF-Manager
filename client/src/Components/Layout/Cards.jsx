import React, { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf';
import axios from 'axios';
import { server } from '../../server';
import { Document, Page } from 'react-pdf';
import { toast } from 'react-toastify';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();





const Cards = () => {

    const [pdf, setPdf] = useState([])
    const [pdfPath, setPdfPath] = useState(null)
    const [user, setUser] = useState(null)
    const [numPages, setNumPages] = useState();
    const [pdfOnView, setPdfOnView] = useState(null)
    const [pageNumbers, setPageNumbers] = useState([])
    const [checkboxStatus, setCheckboxStatus] = useState(false)

    console.log(pdfOnView)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    //getting user deatils from local storage
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

    //setting pdf url
    const showPdf = (pdf) => {
        setPdfPath(`http://localhost:4200/uploads/${pdf}`)
        console.log(pdfPath)
    }

    //function for setting page numbers

    const setPages = (pageNo) => {
        setPageNumbers((prevPages) => {
            const check = prevPages.includes(pageNo - 1);

            if (check) {
                const res = prevPages.filter((page) => page !== pageNo - 1);
                console.log(res);
                return res;
            } else {
                console.log([...prevPages, pageNo - 1]);
                return [...prevPages, pageNo - 1];
            }
        });
    };



    //sender function for extracting the pdf
    const senderFunction = async (id, pdfId) => {
        if(pageNumbers.length!==0){
        await axios.post(`http://localhost:4200/api/v1/extract/${id._id}/${pdfId._id}`, {
            pagesToExtract: pageNumbers
        })
            .then((res) => {
                console.log(res.data)
                window.location.reload();
                toast.success("PDF Extracted successfully")
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            toast.error("Select Pages to extract")
        }

    }




    return (
        <>
            <h1 className='flex justify-center items-center text-center mt-[8vh] text-[30px]'>SELECT THE PDF YOU WANT TO EXTRACT</h1>
            <div className='flex flex-wrap justify-center  mt-10 items-center'>



                {
                    pdf.map((item, index) => (
                        <div key={index} className="max-w-sm m-2 w-[200px] flex flex-col items-center bg-slate-100 border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg w-[100px] mt-3" src="./pdficon.png" alt="" />
                            </a>
                            <div className="p-5 flex flex-col items-center justify-center">

                                <h5 className="mb-2 text-xl font-300 tracking-tight text-gray-800 dark:text-white overflow-ellipsis overflow-hidden break-all">{item.title}</h5>


                                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => {
                                        showPdf(item.PDFdata)
                                        setPdfOnView(item)
                                    }}
                                >
                                    View PDF
                                </button>
                            </div>
                        </div>
                    ))
                }

            </div>

            <div className='flex justify-center mt-10'>
                {pdfOnView &&
                    <button type="button" className="text-white text-[2rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[30vw] h-[8vh]"
                        onClick={() => senderFunction(user, pdfOnView)}
                    >
                        Extract PDF
                    </button>
                }


            </div>

            <div className="mx-auto max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl flex justify-center mt-10">

                <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}
                    className={"mb-4 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20"}
                >
                    {Array.apply(null, Array(numPages))
                        .map((item, i) => i + 1)
                        .map((page) => {
                            return (
                                <>
                                    <div className='mb-4 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20 '>
                                        <div className='flex items-center'>

                                            <input id="checkbox" type="checkbox" value={page} className="w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                onClick={() => setPages(page)}
                                            />




                                            <p>  Page {page} of {numPages}  </p>


                                        </div>
                                        <div className='flex'>
                                            <Page pageNumber={page} renderAnnotationLayer={false} renderTextLayer={false}
                                                width={350}

                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                </Document>

            </div>


        </>
    )
}

export default Cards
