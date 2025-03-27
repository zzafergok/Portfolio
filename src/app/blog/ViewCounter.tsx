'use client';

import React, { useEffect, useState } from 'react';

interface ViewCounterProps {
  blogId: number;
  className?: string;
}

const ViewCounter: React.FC<ViewCounterProps> = ({
  blogId,
  className = '',
}) => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Görüntüleme verilerini getir
    const registerView = async () => {
      try {
        setLoading(true);

        const response = await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ blogId }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API hatası: ${response.status}, ${errorText}`);
        }

        const data = await response.json();

        setViewCount(data.viewCount || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');

        // Yine de okuma sayısını almaya çalış
        getFallbackCount();
      } finally {
        setLoading(false);
      }
    };

    // Alternatif olarak okuma sayısını getir
    const getFallbackCount = async () => {
      try {
        const response = await fetch(`/api/views?blogId=${blogId}`);

        if (response.ok) {
          const data = await response.json();
          setViewCount(data.viewCount || 0);
        }
      } catch (err) {}
    };

    // Sayfa yüklendiğinde görüntülemeyi kaydet
    registerView();
  }, [blogId]);

  if (loading) {
    return (
      <span
        className={`text-xs text-neutral-500 dark:text-neutral-400 ${className}`}
      >
        ...
      </span>
    );
  }

  return (
    <span
      className={`text-xs text-neutral-500 dark:text-neutral-400 ${className}`}
    >
      {error ? '0 okuma' : `${viewCount} okuma`}
    </span>
  );
};

export default ViewCounter;
