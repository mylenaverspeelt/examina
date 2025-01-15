import React, { Suspense } from 'react';
import styles from "./page.module.css";
import PdfList from '@/components/PdfList/PdfList';
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';

export default async function Uploads() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <div className={styles.main}>
        <h1>Exames arquivados</h1>
        <PdfList />
      </div></Suspense>
  );
}
