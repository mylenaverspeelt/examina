import React, { Suspense } from "react"
import styles from "./page.module.css"
import FileUpload from "@/components/FileUpload/FileUpload"
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent"

export default async function Home() {

	return (
		<Suspense fallback={<LoadingComponent />}>
			<div className={styles.main}>
				<h1 className={styles.title}>Adicione um novo exame</h1>
				<FileUpload />
			</div>
		</Suspense>
	)
}
