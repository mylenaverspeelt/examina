'use client';
import { useEffect, useState } from 'react';
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
  Legend
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
  const router = useRouter();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`/api/patients/${params.id}`);
        if (!response.ok) {
          throw new Error("Paciente não encontrado");
        }
        const data = await response.json();
        setPatient(data.patient);

        // Fetch glucose records
        const glucoseResponse = await fetch(`/api/patients/${params.id}/glucoseRecords`);
        if (!glucoseResponse.ok) {
          throw new Error("Erro ao buscar registros de glicose");
        }
        const glucoseData = await glucoseResponse.json();
        setGlucoseRecords(glucoseData.records);
      } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
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

  // Preparar os dados do gráfico
  const chartData = {
    labels: glucoseRecords.map(record => new Date(record.createdAt).toLocaleDateString()), // Datas formatadas
    datasets: [
      {
        label: 'Glicose',
        data: glucoseRecords.map(record => record.result),
        borderColor: '#0070f3',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Histórico de Exames de Glicose',
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
      <div className={styles.chartDiv} style={{ marginTop: '20px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
