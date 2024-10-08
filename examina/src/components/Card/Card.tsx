import Link from "next/link"
import styles from "./Card.module.css"

interface CardProps{
    title:string
}

export default function Card({title}: CardProps) {
    return <div className={styles.card}>
        <Link href="/new" className={styles.title}>{title}</Link>
    </div>
}