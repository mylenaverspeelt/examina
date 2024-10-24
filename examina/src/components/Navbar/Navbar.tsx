import Button from "../Button/Button"
import styles from "./Navbar.module.css"
import Link from "next/link"

export default function Navbar() {
    return <nav className={styles.nav}>
        <div className={styles.logoDiv}>
            <Link href="/" passHref>
                <h1 className={styles.title}>examina</h1>
            </Link>
        </div>
        <div className={styles.loginDiv}>
            <Button label="Entrar / Registrar" variant="button" />
        </div>
    </nav>
}