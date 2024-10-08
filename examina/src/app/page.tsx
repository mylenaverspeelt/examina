import Card from "@/components/Card/Card";
import styles from "./page.module.css"

export default function Home() {
  return <section className={styles.main}>
    <Card title="Adicionar um novo exame"></Card>
    <Card title="Ver exames armazenados"></Card>
    <Card title="Gerar Gráficos e Relatórios"></Card>
  </section >
}
