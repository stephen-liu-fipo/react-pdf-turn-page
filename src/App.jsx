import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {Outline, pdfjs, Page as ReactPdfPage} from 'react-pdf';
import HTMLFlipBook from "react-pageflip";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


import { Document, Page } from 'react-pdf';

import pdf from './assets/sample.pdf'

function App() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  const width = 300;
  const height = 424;

  const Page = React.forwardRef(({ pageNumber }, ref) => {
    return (
      <div ref={ref}>
        <ReactPdfPage pageNumber={pageNumber} width={width} height={height} />
      </div>
    );
  });



  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }

  function onPage (e)  {
    console.log(e)
  }

  return (
    <div>
      <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} >
          <HTMLFlipBook
            width={width}
            height={height}
            size="fixed"
            minWidth={width}
            maxWidth={width}
            minHeight={height}
            maxHeight={height}
            showPageCorners={false}
            maxShadowOpacity={0.5}
            onFlip={onPage}
          >
            {Array.from(
              new Array(numPages),
              (el, index) => (
                <Page
                  devicePixelRatio={window.devicePixelRatio}
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  number={index + 1}
                />
              ),
            )}
          </HTMLFlipBook>

      </Document>

      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default App
