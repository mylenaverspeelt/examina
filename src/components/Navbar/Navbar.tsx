import { Button } from "@mui/material"
import styles from "./Navbar.module.css"
import Link from "next/link"

export default function Navbar() {
	return (
		<nav className={styles.nav}>
			<div className={styles.container}>
				<div className={styles.logoDiv}>
					<Link href="/" passHref>
						<h1 className={styles.title}>examina</h1>
					</Link>
				</div>
				<div className={styles.loginDiv}>
					<Button variant="contained" className="login-button">
                        Entrar / Registrar
					</Button>
				</div>
			</div>
		</nav>
	)
}
