'use client';

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import FileUpload from "@/components/FileUpload/FileUpload";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <ClipLoader color="#388B8B" size={50} />
            </div>
        );
    }

    return (
        <div className={styles.main}>
            <div className={styles.uploadDiv}>
                <h1 className={styles.title}>Adicione um novo exame</h1>
                <FileUpload />
            </div>
        </div>
    );
}
