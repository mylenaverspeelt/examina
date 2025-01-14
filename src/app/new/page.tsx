import React from 'react';
import styles from "./page.module.css";
import FileUpload from "@/components/FileUpload/FileUpload";
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';

export default async function Home() {

    return (
        <LoadingComponent>
            <div className={styles.main}>
                <div className={styles.uploadDiv}>
                    <h1 className={styles.title}>Adicione um novo exame</h1>
                    <FileUpload />
                </div>
            </div>
        </LoadingComponent>
    );
}
