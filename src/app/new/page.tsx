'use client';

import React, { useEffect } from 'react';
import styles from "./page.module.css";
import FileUpload from "@/components/FileUpload/FileUpload";
import ClipLoader from "react-spinners/ClipLoader";
import { useLoadingClipLoader } from '@/hooks/useLoadingClipLoader';

export default function Home() {
    const { loading, setLoading, withLoading } = useLoadingClipLoader();

    useEffect(() => {
        withLoading(() => new Promise(resolve => setTimeout(resolve, 1000)));
    }, [withLoading]);

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
