import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import NavigationBar from './NavigationBar';
import './Statistics.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PdfViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-viewer-container">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="document-container"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderMode="canvas" // Set renderMode to 'canvas' to render only canvas elements
            className={`page-${index + 1}`}
          />
        ))}
      </Document>
    </div>
  );
};

const ComingSoon = () => {
  return (
    <div className="app-container" style={{
      paddingTop: '80px',
      boxSizing: 'border-box',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f8f8f8'
    }}>
      <NavigationBar />
      <div className="content-container" style={{
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: '20px'
      }}>
       
        <div className="viewer-container" style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <PdfViewer fileUrl="/Report.pdf" />
        </div>
      </div>
    </div>
  );

};

{/* <div className="flex items-center justify-center h-full" style={{ position: 'relative', top: '60px' }}> */}


export default ComingSoon;
