'use client';
import React, { useEffect, useState } from 'react';
import GlucoseChart from '@/components/GlucoseChart/GlcoseChart';
import styles from './page.module.css';
import { ClipLoader } from 'react-spinners';
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';
import { useLoadingClipLoader } from '@/hooks/useLoadingClipLoader';

interface GlucoseData {
  normalCount: number;
  preDiabetesCount: number;
  diabetesCount: number;
}

export default function Analytics() {
  const { loading, withLoading } = useLoadingClipLoader();
  const [data, setData] = useState<GlucoseData | null>(null);

  useEffect(() => {
    withLoading(async () => {
      try {
        const response = await fetch('/api/getGlucose');
        const result = await response.json();
        setData(result);
      } catch {
        ErrorAlert({ message: 'Não foi possível carregar os dados de glicose.' });
      }
    });
  }, [withLoading]);

  if (loading || !data) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#388B8B" size={50} />
      </div>
    );
  }

  return (
    <div className={styles.chartDiv}>
      <GlucoseChart
        normalCount={data.normalCount}
        preDiabetesCount={data.preDiabetesCount}
        diabetesCount={data.diabetesCount}
      />
    </div>
  );
}
