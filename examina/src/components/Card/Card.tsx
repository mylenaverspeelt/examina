import Link from "next/link"
import styles from "./Card.module.css"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface CardProps {
    title: string
    icon: IconDefinition
}

export default function Card({ title, icon }: CardProps) {
    return <Link className={styles.card} href="/new">
        <FontAwesomeIcon className={styles.icon} icon={icon} />
        {title}
    </Link>


}