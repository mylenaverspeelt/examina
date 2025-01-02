'use client';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  const pathname = usePathname(); 

  const isHome = pathname === '/' || pathname === '/home';

  if (isHome) {
    return <>{children}</>; 
  }

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        {children}
      </section>
    </div>
  );
}
