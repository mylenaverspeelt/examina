"use client"

import React, { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
	ScriptableContext,
} from "chart.js"
import styles from "./GlucoseChart.module.css"
import ModalAlert from "@/components/ModalAlert/ModalAlert"
import { useSingleRequest } from "@/hooks/useSingleRequest"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface GlucoseData {
  normalCount: number;
  preDiabetesCount: number;
  diabetesCount: number;
}

const GlucoseChart: React.FC = () => {
	const [data, setData] = useState<GlucoseData | null>(null)
	const [barThickness, setBarThickness] = useState(200)
	const executeSingleRequest = useSingleRequest()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await executeSingleRequest(async () => {
					const response = await fetch("/api/getGlucose")
					return response.json()
				})
				setData(result)
			} catch {
				ModalAlert({ message: "Não foi possível carregar os dados de glicose.", type: "error", title: "Erro" })
			}
		}

		fetchData()
	}, [executeSingleRequest])

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth
			if (screenWidth <= 768) {
				setBarThickness(50)
			} else if (screenWidth <= 1024) {
				setBarThickness(100)
			} else {
				setBarThickness(200)
			}
		}

		handleResize()
		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	if (!data) {
		return null 
	}

	const chartData = {
		labels: ["Normal", "Pré-diabetes", "Diabetes"],
		datasets: [
			{
				label: "Distribuição de Resultados de Glicose",
				data: [data.normalCount, data.preDiabetesCount, data.diabetesCount],
				backgroundColor: (context: ScriptableContext<"bar">) => {
					const chart = context.chart
					const { ctx, chartArea } = chart

					if (!chartArea) {
						return "#CCCCCC"
					}

					const gradientGreen = ctx.createLinearGradient(0, 0, 0, chartArea.bottom)
					gradientGreen.addColorStop(0, "#4CAF50")
					gradientGreen.addColorStop(1, "#388E3C")

					const gradientOrange = ctx.createLinearGradient(0, 0, 0, chartArea.bottom)
					gradientOrange.addColorStop(0, "#FF9800")
					gradientOrange.addColorStop(1, "#F57C00")

					const gradientRed = ctx.createLinearGradient(0, 0, 0, chartArea.bottom)
					gradientRed.addColorStop(0, "#F44336")
					gradientRed.addColorStop(1, "#D32F2F")

					return [gradientGreen, gradientOrange, gradientRed][context.dataIndex] || "#CCCCCC"
				},
				borderRadius: 10,
				barThickness: barThickness,
				borderWidth: 2,
			},
		],
	}

	const options: ChartOptions<"bar"> = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: "Distribuição de Resultados de Glicose",
				font: {
					size: 18,
					weight: "bold" as const,
				},
			},
			tooltip: {
				enabled: true,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Categorias",
				},
				grid: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: "Quantidade de Exames",
				},
				ticks: {
					stepSize: 1,
				},
				grid: {
					color: "rgba(200, 200, 200, 0.2)",
				},
			},
		},
	}

	return <Bar data={chartData} options={options} className={styles.chartDiv} />
}

export default GlucoseChart
