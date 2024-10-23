import styles from "./page.module.css"
import { faChartLine, faCirclePlus, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import Button from "@/components/Button/Button";

export default function Home() {
  return <section className={styles.main}>
      <Button label="Adicionar um novo exame" href="/new" icon={faCirclePlus} variant="menuButton" />
      <Button label="Ver exames armazenados"  icon={faFolderOpen} href="/uploads" variant="menuButton" />
      <Button label="Gerar Gráficos e Relatórios" icon={faChartLine} href="/analytics" variant="menuButton" />
  </section >
}
