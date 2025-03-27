// src/components/ResumeViewer/PDFPageCounter.tsx
import React from 'react';

interface PDFPageCounterProps {
  pageNumber: number;
  numPages: number | null;
}

const PDFPageCounter: React.FC<PDFPageCounterProps> = ({
  pageNumber,
  numPages,
}) => {
  return (
    <div className="text-sm text-gray-600">
      {numPages ? (
        <span>
          Sayfa <span className="font-medium">{pageNumber}</span> /{' '}
          <span>{numPages}</span>
        </span>
      ) : (
        <span>Yükleniyor...</span>
      )}
    </div>
  );
};

export default PDFPageCounter;
