'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  const pathname = usePathname(); // Obter a rota atual

  // Verificar se a rota é "/" ou "/home"
  const isHome = pathname === '/' || pathname === '/home';

  // Se a rota for "/" ou "/home", não renderiza o container
  if (isHome) {
    return <>{children}</>; // Renderiza apenas o conteúdo sem o container
  }

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        {children}
      </section>
    </div>
  );
}
