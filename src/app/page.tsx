'use client'
import styles from './page.module.css';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import BarChartIcon from '@mui/icons-material/BarChart';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <>
      <section className={styles.main}>
        <div className={styles.searchDiv}>
          <SearchBar />
        </div>
        <div className={styles.buttonDiv}>
          <Button label="Adicionar exame" href="/new" icon={<PostAddIcon fontSize='large' />} variant="menuButton" />
          <Button label="Exames armazenados" icon={<FolderCopyIcon fontSize='large' />} href="/uploads" variant="menuButton" />
          <Button label="Visualizar Distribuição" icon={<BarChartIcon fontSize='large' />} href="/analytics" variant="menuButton" />
        </div>
      </section>
 {/* <Fab
        className={`${styles.fabButton} ${hovered ? styles.fabButtonHovered : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => router.push('/new-report')}
        aria-label="Adicionar novo laudo"
      >
        <AddIcon className={styles.fabIcon} />
        {hovered && <span className={styles.fabText}>Novo Laudo</span>}
      </Fab> */}
    </>
  );
}

