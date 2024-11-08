'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from "react-spinners/ClipLoader";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from "./page.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Patient {
  id: number;
  name: string;
  age: string;
  birthDate: string;
}

interface GlucoseRecord {
  createdAt: string;
  result: number;
}

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [glucoseRecords, setGlucoseRecords] = useState<GlucoseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);  // Ref para o gráfico
  const router = useRouter();

  useEffect(() => {
    const fetchPatientAndGlucoseData = async () => {
      try {
        const response = await fetch(`/api/patients/${params.id}`);
        if (!response.ok) {
          throw new Error("Paciente não encontrado");
        }
        const data = await response.json();
        setPatient(data.patient);

        const glucoseResponse = await fetch(`/api/patients/${params.id}/glucoseRecords`);
        if (!glucoseResponse.ok) {
          throw new Error("Erro ao buscar registros de glicose");
        }
        const glucoseData = await glucoseResponse.json();
        setGlucoseRecords(glucoseData.records);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientAndGlucoseData();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#0070f3" size={50} />
      </div>
    );
  }

  if (!patient) {
    return <div>Paciente não encontrado</div>;
  }

  // montando o grafico
  const chartData = {
    labels: glucoseRecords.map(record => new Date(record.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Glicose',
        data: glucoseRecords.map(record => record.result),
        borderColor: '#3E0649',
        fill: false,
      },
    ],
  };

  // opçoes do gráfico
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,  
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Histórico de Exames de Glicose',
      },
    },
    layout: {
      padding: {
        top: 20,
        left: 10,
        right: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.infosDiv}>
        <h1>{patient.name}</h1>
        <p>Idade: {patient.age}</p>
        <p>Data de Nascimento: {patient.birthDate}</p>
      </div>
      <div className={styles.chartDiv} ref={chartRef} style={{ height: '80vh', width: '100%' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
