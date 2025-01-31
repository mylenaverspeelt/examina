import React, { Suspense } from "react"
import styles from "./page.module.css"
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent"
import PatientDetails from "@/components/PatientDetails/PatientDetails"

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PatientDetailPage({ params }: PageProps) {
	const resolvedParams = await params
	const { id } = resolvedParams

	return (
		<div className={styles.container}>
			<Suspense fallback={<LoadingComponent />}>
				<PatientDetails patientId={id} />
			</Suspense>
		</div>
	)
}