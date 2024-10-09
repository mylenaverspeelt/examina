import React from 'react'
import styles from "./page.module.css"
import Card from '@/components/Card/Card'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

export default function Uploads() {
    return <div className={styles.main}>
            <h1>Exames arquivados</h1>
            <Card href='/' icon={faFilePdf} title='Exame 1' />
            <Card href='/' icon={faFilePdf} title='Exame 2' />
            <Card href='/' icon={faFilePdf} title='Exame 3' />
            <Card href='/' icon={faFilePdf} title='Exame 1' />
            <Card href='/' icon={faFilePdf} title='Exame 1' />
            <Card href='/' icon={faFilePdf} title='Exame 1' />
            <Card href='/' icon={faFilePdf} title='Exame 1' />
        </div>
}

