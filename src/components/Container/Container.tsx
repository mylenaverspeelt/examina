import React, { ReactNode } from 'react';
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        {children}
      </section>
    </div>
  );
}
