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
          <Button label="Adicionar um novo exame" href="/new" icon={<PostAddIcon fontSize='large' />} variant="menuButton" />
          <Button label="Ver exames armazenados" icon={<FolderCopyIcon fontSize='large' />} href="/uploads" variant="menuButton" />
          <Button label="Visualizar Distribuição" icon={<BarChartIcon fontSize='large' />} href="/analytics" variant="menuButton" />
        </div>
      </section>
      <Fab
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => router.push('/new-report')}
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          padding: hovered ? '0 1.5rem' : 0,
          fontWeight: 'bold',
          zIndex: 1000,
          textTransform: 'none',
          backgroundColor: 'var(--light-gray)',
          color: 'var(--purple)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          width: hovered ? 'auto' : 56,
          height: 56,
          borderRadius: '28px',
          boxShadow: 'var(--box-shadow)',
          overflow: 'hidden',
          '&:hover': {
            backgroundColor: 'var(--purple-hover)',
            color: 'var(--white)',
            transform: 'translateY(-4px)',
          },
        }}
      >
        <AddIcon
          fontSize="large"
          sx={{
            color: 'var(--teal)',
            marginRight: hovered ? 1 : 0,
            transition: 'margin-right 0.3s ease',
          }}
        />
        {hovered && (
          <span
            style={{
              whiteSpace: 'nowrap',
              fontSize: '1rem',
              transition: 'opacity 0.3s ease',
            }}
          >
            Novo Laudo
          </span>
        )}
      </Fab></>)
}