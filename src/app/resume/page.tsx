'use client';

import dynamic from 'next/dynamic';

// Dinamik import ile react-pdf bileşeninin yalnızca client tarafında yüklenmesini sağlıyoruz
const ResumeViewer = dynamic(
  () => import('./ResumeViewer').then((mod) => mod.ResumeViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center w-full h-64">
        <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-blue-600"></div>
      </div>
    ),
  }
);

export default function ResumePage() {
  return (
    <main className="">
      <div className="container mx-auto px-4">
        <ResumeViewer
          pdfUrl="/assets/resume/Zafer_Gok_Resume_English.pdf"
          title="Zafer Gök - Frontend Developer"
        />
      </div>
    </main>
  );
}
