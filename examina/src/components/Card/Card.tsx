import Link from "next/link"
import styles from "./Card.module.css"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface CardProps {
    title: string
    icon: IconDefinition
    href: string
}

export default function Card({ title, icon, href }: CardProps) {
    return <Link className={styles.card} href={href}>
        <FontAwesomeIcon className={styles.icon} icon={icon} />
        {title}
    </Link>
}