"use client"

import React from "react"
import styles from "./LoadingComponent.module.css"
import ClipLoader from "react-spinners/ClipLoader"

export default function LoadingComponent() {

	return (
		<div className={styles.loadingContainer}>
			<ClipLoader color="#388B8B" size={50} />
		</div>
	)
}

