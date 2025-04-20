import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import NavigationBar from "./NavigationBar";

const PdfViewer = ({ fileUrl }) => {
  // Default layout plugin adds toolbar, sidebar, and more controls
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="w-full h-full bg-white shadow-lg rounded-2xl overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};

const ComingSoon = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100 pt-20">
      <NavigationBar />
      <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-8 lg:px-16 py-8">
        <div className="w-full max-w-4xl h-[80vh]">
          <PdfViewer fileUrl="/Report.pdf" />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
