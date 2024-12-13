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

export default function Home() {
  const [hovered, setHovered] = useState(false);

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

      <Fab variant="extended"
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          padding: 2,
          fontWeight: 'bold',
          zIndex: 1000,
          textTransform: 'none',
          width: 56, 
          height: 56, 
          backgroundColor: 'var(--light-gray)', 
          color: 'var(--purple)', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease, background-color 0.3s ease', // transições suaves
          '&:hover': {
            backgroundColor: 'var(--purple-hover)', 
            color: 'var(--white)',
            transform: 'translateY(-4px)', 
            width: 'auto',
          },
          '& .MuiFab-icon': {
            marginRight: 5, 
          },
          '&:hover .MuiFab-icon': {
            marginRight: 5, 
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AddIcon  fontSize='large' sx={{ color: 'var(--teal)' }} />
        {hovered && <span className={styles.span}>Novo Laudo</span>}
      </Fab>
    </>
  );
}
