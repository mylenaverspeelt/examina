import Image from "next/image"
import styles from "./Navbar.module.css"
import Button from "../Button/Button"
import Link from "next/link"

export default function Navbar() {
    return <nav className={styles.nav}>
        <div className={styles.logoDiv}>
        <Link href="/" passHref>
                    <Image 
                        src="/examina-logo.png" 
                        alt="logo" 
                        className={styles.logo} 
                        width={150} 
                        height={35} 
                    />
                </Link>
        </div>
        <div className={styles.loginDiv}>
            <Button label="Login / Register" />
        </div>
    </nav>
}