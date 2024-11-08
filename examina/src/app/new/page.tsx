import styles from "./page.module.css"
import FileUpload from "@/components/FileUpload/FileUpload";

export default function Home() {
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Adicione um novo exame</h1>
            <FileUpload />
        </div>
    );
}
