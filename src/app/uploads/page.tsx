import React from 'react';
import styles from "./page.module.css";
import PdfList from '@/components/PdfList/PdfList';

export default async function Uploads() {
  return (
    <div className={styles.main}>
      <h1>Exames arquivados</h1>
      <PdfList />
    </div>
  );
}
