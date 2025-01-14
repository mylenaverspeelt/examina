import React from 'react';
import styles from './page.module.css';
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';
import GlucoseChart from '@/components/GlucoseChart/GlcoseChart';

export default async function Analytics() {

  return (
    <LoadingComponent>
      <div className={styles.main}>
        <GlucoseChart />
      </div>
    </LoadingComponent>

  );
}
