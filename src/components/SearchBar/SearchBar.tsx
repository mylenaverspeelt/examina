"use client"

import { useState, useEffect, useCallback } from "react"
import styles from "./SearchBar.module.css"
import Link from "next/link"
import SearchIcon from "@mui/icons-material/Search"
import ModalAlert from "../ModalAlert/ModalAlert"
import { useSingleRequest } from "@/hooks/useSingleRequest"

interface Patient {
  id: number;
  name: string;
}

export default function SearchBar() {
	const [searchTerm, setSearchTerm] = useState("")
	const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
	const [cache, setCache] = useState<Record<string, Patient[]>>({})
	const executeSingleRequest = useSingleRequest()

	const fetchPatients = useCallback(async (term: string) => {
		if (cache[term]) {
			setFilteredPatients(cache[term])
			return
		}

		try {
			const result = await executeSingleRequest(async () => {
				const response = await fetch(`/api/patients?query=${term}`)
				if (!response.ok) {
					throw new Error("Erro ao buscar pacientes")
				}
				const data = await response.json()
				return data.patients || []
			})

			setCache((prev) => ({ ...prev, [term]: result }))
			setFilteredPatients(result)
		} catch (error) {
			ModalAlert({ message: "Paciente não encontrado", type: "info", title: "Ops" })
			setFilteredPatients([])
		}
	}, [cache, executeSingleRequest])

	useEffect(() => {
		const delayDebounce = setTimeout(() => {
			if (searchTerm) {
				fetchPatients(searchTerm)
			} else {
				setFilteredPatients([])
			}
		}, 300)

		return () => clearTimeout(delayDebounce)
	}, [searchTerm, fetchPatients])

	return (
		<div className={styles.searchContainer}>
			<input
				type="text"
				className={styles.searchInput}
				placeholder="Pesquisar paciente..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<SearchIcon className={styles.searchIcon} />

			{filteredPatients.length > 0 && (
				<ul className={styles.dropdown}>
					{filteredPatients.map((patient) => (
						<li key={patient.id} className={styles.dropdownItem}>
							<Link href={`/patients/${patient.id}`}>
								{patient.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}