
import Upload from "@/components/Upload/Upload";
import styles from "./page.module.css"
export default function Home() {
    return (
        <div className={styles.new}>
            <h1 className={styles.title}>Adicione um novo Exame:</h1>
            <Upload />
        </div>
    );
}
