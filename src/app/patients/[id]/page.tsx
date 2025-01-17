import React, { Suspense } from 'react';
import styles from './page.module.css';
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';
import PatientDetails from '@/components/PatientDetails/PatientDetails';

export default async function PatientDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className={styles.container}>
      <Suspense fallback={<LoadingComponent />}>
        <PatientDetails patientId={id} />
      </Suspense>
    </div>
  );
}
