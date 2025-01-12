'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import ClipLoader from 'react-spinners/ClipLoader';

export default function NewReport() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#388B8B" size={50} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New Report</h1>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="nome">Nome:</label>
          <input
            className={styles.input}
            type="text"
            id="nome"
            name="nome"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="dataNascimento">Data de Nascimento:</label>
          <input
            className={styles.input}
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="glicose">Resultado Glicose:</label>
          <input
            className={styles.input}
            type="text"
            id="glicose"
            name="glicose"
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Finalizar
        </button>
      </form>
    </div>
  );
}
