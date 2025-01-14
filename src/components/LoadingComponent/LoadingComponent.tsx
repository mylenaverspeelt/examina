"use client";

import React, { useEffect } from 'react';
import styles from "./LoadingComponent.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useLoadingClipLoader } from '@/hooks/useLoadingClipLoader';

interface LoadingComponentProps {
  children: React.ReactNode;
}

export default function LoadingComponent({ children }: LoadingComponentProps) {
  const { loading, setLoading, withLoading } = useLoadingClipLoader();

  useEffect(() => {
    const loadData = async () => {
      await withLoading(() => new Promise((resolve) => setTimeout(resolve, 1000)));
    };

    loadData();
  }, [withLoading]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#388B8B" size={50} />
      </div>
    );
  }

  return <>{children}</>;
}
