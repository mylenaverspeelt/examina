'use client';

import styles from "./page.module.css";
import FileUpload from "@/components/FileUpload/FileUpload";


export default function Home() {

    return (
        <div className={styles.main}>
            <div className={styles.uploadDiv}>
                <h1 className={styles.title}>Adicione um novo exame</h1>
                <FileUpload />
            </div>
        </div>
    );
}
