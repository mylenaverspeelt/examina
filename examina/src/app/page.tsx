import styles from './page.module.css';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import BarChartIcon from '@mui/icons-material/BarChart';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
  return (
    <>
      <section className={styles.main}>
        <div className={styles.searchDiv}>
          <SearchBar />
        </div>
        <div className={styles.buttonDiv}>
          <Button label="Adicionar um novo exame" href="/new" icon={<PostAddIcon />} variant="menuButton" />
          <Button label="Ver exames armazenados" icon={<FolderCopyIcon />} href="/uploads" variant="menuButton" />
          <Button label="Visualizar Distribuição" icon={<BarChartIcon />} href="/analytics" variant="menuButton" />
        </div>
      </section>

      <Fab 
        aria-label="add" 
        sx={{
          color: 'white',
          backgroundColor: '#44b1a0',
          width: 200, 
          height: 80, 
          position: 'fixed',
          bottom: 20,  
          right: 20, 
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',  
          alignItems: 'center',   
          padding: 2,
          borderRadius: 8,
          gap: 1                     
        }}
      >
        Novo Laudo
        <AddIcon />
      </Fab>
    </>
  );
}
