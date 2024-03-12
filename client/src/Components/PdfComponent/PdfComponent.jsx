import { useState } from 'react';
import { Document, Page } from 'react-pdf';


function pdfComponent(props) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    console.log(props.pdfPath)

    return (
        <div className="mx-auto max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">

            <Document file={props.pdfPath} onLoadSuccess={onDocumentLoadSuccess}
                className={"mb-4 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20"}
            >
                {Array.apply(null, Array(numPages))
                    .map((item, i) => i + 1)
                    .map((page) => {
                        return (
                            <>
                                <div className='mb-4 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20'>
                                    <div className='flex items-center'>

                                        <input id="checkbox" type="checkbox" value="" className="w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                                        <p>  Page {page} of {numPages}  </p>


                                    </div>
                                    <Page pageNumber={page} renderAnnotationLayer={false} renderTextLayer={false}
                                        width={350}

                                    />
                                </div>
                            </>
                        )
                    })
                }

            </Document>

        </div>
    );
}

export default pdfComponent