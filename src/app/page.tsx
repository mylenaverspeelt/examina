import styles from './page.module.css';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar/SearchBar';

export default function Home() {
  return (
    <>
      <section className={styles.main}>
        <div className={styles.searchDiv}>
          <SearchBar />
        </div>
        <div className={styles.buttonDiv}>
          <Link href="/new" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              className="menu-button"
              startIcon={<AddIcon sx={{ width: 30, height: 30 }} />}
            >
              Adicionar exame
            </Button>
          </Link>
          
          <Link href="/uploads" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              className="menu-button"
              startIcon={<FolderCopyIcon sx={{ width: 30, height: 30 }} />}
            >
              Exames armazenados
            </Button>
          </Link>
          
          <Link href="/analytics" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              className="menu-button"
              startIcon={<BarChartIcon sx={{ width: 30, height: 30 }} />}
            >
              Visualizar Distribuição
            </Button>
          </Link>

          <Link href="/new-report" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              className="menu-button"
              startIcon={<PostAddIcon sx={{ width: 30, height: 30 }} />}
            >
              Novo Laudo
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}