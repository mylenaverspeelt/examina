"use client"
import React, { Suspense } from "react"
import styles from "./page.module.css"
import GlucoseChart from "@/components/GlucoseChart/GlcoseChart"
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent"



export default function Analytics() {
	return (
		<Suspense fallback={<LoadingComponent />}>
			<div className={styles.main}>
				<GlucoseChart />
			</div>
		</Suspense>
	)
}
