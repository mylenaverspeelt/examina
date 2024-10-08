import Card from "@/components/Card/Card";
import styles from "./page.module.css"
import { faChartLine, faCirclePlus, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return <section className={styles.main}>
    <Card title="Adicionar um novo exame" icon={faCirclePlus}></Card>
    <Card title="Ver exames armazenados" icon={faFolderOpen}></Card>
    <Card title="Gerar Gráficos e Relatórios" icon={faChartLine}></Card>
  </section >
}
