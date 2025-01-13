'use client';
import React, { useEffect, useState } from 'react';
import GlucoseChart from '@/components/GlucoseChart/GlcoseChart';
import styles from './page.module.css';
import { ClipLoader } from 'react-spinners';
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';
import { useSingleRequest } from '@/hooks/useSingleRequest';

interface GlucoseData {
  normalCount: number;
  preDiabetesCount: number;
  diabetesCount: number;
}

export default function Analytics() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GlucoseData | null>(null);
  const executeSingleRequest = useSingleRequest();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await executeSingleRequest(async () => {
          const response = await fetch('/api/getGlucose');
          return response.json();
        });
        setData(result);
      } catch {
        ErrorAlert({ message: 'Não foi possível carregar os dados de glicose.' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [executeSingleRequest]);

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