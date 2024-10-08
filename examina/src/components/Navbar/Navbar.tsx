import Image from "next/image"
import styles from "./Navbar.module.css"

export default function Navbar() {
    return <nav className={styles.nav}>
        <div className={styles.logoDiv}>
            <Image src="/examina-logo.jpg
" alt="logo" className={styles.logo} width={200} height={100} />
        </div>
        <div className={styles.loginDiv}>
            <p>Login / Register</p>
        </div>
    </nav>
}