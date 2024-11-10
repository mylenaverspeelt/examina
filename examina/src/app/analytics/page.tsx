'use client';
import React, { useEffect, useState } from 'react';
import GlucoseChart from '@/components/GlucoseChart/GlcoseChart';
import styles from './page.module.css';
import { ClipLoader } from 'react-spinners';
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';

interface GlucoseData {
  normalCount: number;
  preDiabetesCount: number;
  diabetesCount: number;
}

export default function Analytics() {
  const [data, setData] = useState<GlucoseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getGlucose');
        const result = await response.json();
        setData(result);
      } catch {
        ErrorAlert({ message: 'Não foi possível carregar os dados de glicose.' });
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#0070f3" size={50} />
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
