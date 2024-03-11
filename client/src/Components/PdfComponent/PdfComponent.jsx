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
        <div className='mt-10'>

            <Document file={props.pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.apply(null, Array(numPages))
                    .map((item, i) => i + 1)
                    .map((page) => {
                        return (
                            <>
                                <div className='mt-10'>
                                    <p>
                                        Page {page} of {numPages}
                                    </p>
                                    <Page pageNumber={page} renderAnnotationLayer={false} renderTextLayer={false}
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