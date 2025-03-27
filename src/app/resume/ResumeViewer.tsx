'use client';

import { useState, useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useWindowSize } from '@/hooks/useWindowSize';
import DownloadButton from './DownloadButton';
import { PDFControls } from './PDFControls';
import PDFPageCounter from './PDFPageCounter';
import type { PDFDocumentProxy as ReactPDFDocumentProxy } from 'pdfjs-dist';
import { Spinner } from '@/components/ui/Spinner';

// PDF worker configuration
// Bu satır çok önemli - worker'ı doğru şekilde yapılandırıyoruz
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ResumeViewerProps {
  pdfUrl: string;
  title?: string;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  pdfUrl,
  title = 'Özgeçmiş',
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const { width } = useWindowSize();

  // Client tarafında olduğumuzdan emin olmak için state'i tutuyoruz
  const [isClient, setIsClient] = useState(false);

  // Client tarafında olduğumuzdan emin olmak için
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset to page 1 if pdf changes
  useEffect(() => {
    setPageNumber(1);
    setLoading(true);
    setError(null);
  }, [pdfUrl]);

  // Responsive scaling based on viewport width - mobil için daha uygun ölçekleme
  useEffect(() => {
    if (width) {
      if (width < 480) {
        // Çok küçük ekranlar için daha agresif ölçekleme
        setScale(0.45);
      } else if (width < 640) {
        setScale(0.55);
      } else if (width < 768) {
        setScale(0.75);
      } else if (width < 1024) {
        setScale(0.9);
      } else {
        setScale(1.1);
      }
    }
  }, [width]);

  const onDocumentLoadSuccess = (document: ReactPDFDocumentProxy) => {
    setNumPages(document.numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF yüklenirken hata oluştu:', error);
    setError(
      'PDF dosyası yüklenemedi. Lütfen dosya yolunun doğru olduğundan emin olun.'
    );
    setLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) =>
      numPages ? Math.min(prevPageNumber + 1, numPages) : prevPageNumber
    );
  };

  // PDF seçeneklerini memoize ediyoruz
  const pdfOptions = useMemo(
    () => ({
      cMapUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/cmaps/',
      cMapPacked: true,
    }),
    []
  );

  // Client tarafında değilsek hiçbir şey render etme
  if (!isClient) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto my-4 sm:my-8 px-2 sm:px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>

      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-full">
        <div className="bg-gray-100 p-2 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div className="w-full sm:w-auto">
            <PDFPageCounter pageNumber={pageNumber} numPages={numPages} />
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-start">
            <PDFControls
              goToPrevPage={goToPrevPage}
              goToNextPage={goToNextPage}
              hasPrevPage={pageNumber > 1}
              hasNextPage={numPages ? pageNumber < numPages : false}
              scale={scale}
              setScale={setScale}
            />
            <DownloadButton pdfUrl={pdfUrl} />
          </div>
        </div>

        <div className="relative flex justify-center p-2 sm:p-4 bg-gray-50 min-h-[400px] sm:min-h-[600px] overflow-x-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <Spinner />
            </div>
          )}

          {error ? (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Yeniden Dene
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full max-w-full overflow-hidden">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading=""
                className="flex flex-col items-center w-full"
                options={pdfOptions}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  loading=""
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="mb-4 sm:mb-8 rounded-md shadow-md bg-white"
                  width={width ? Math.min(width - 40, 1000) : undefined}
                  canvasClassName="max-w-full h-auto rounded-md"
                  containerClassName="flex justify-center w-full overflow-hidden px-1"
                />
              </Document>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
