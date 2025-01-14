"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';
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
import styles from './PatientDetails.module.css';
import ModalAlert from '@/components/ModalAlert/ModalAlert';
import { useSingleRequest } from '@/hooks/useSingleRequest';

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

interface PatientDetailsProps {
  patientId: string;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [glucoseRecords, setGlucoseRecords] = useState<GlucoseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const executeSingleRequest = useSingleRequest();
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchPatientAndGlucoseData = async () => {
      try {
        const patientResponse = await fetch(`/api/patients/${patientId}`);
        if (!patientResponse.ok) {
          throw new Error('Paciente não encontrado');
        }
        const patientData = await patientResponse.json();
        setPatient(patientData.patient);

        const glucoseResponse = await fetch(`/api/patients/${patientId}/glucoseRecords`);
        if (!glucoseResponse.ok) {
          throw new Error('Erro ao buscar registros de glicose');
        }
        const glucoseData = await glucoseResponse.json();
        setGlucoseRecords(glucoseData.records);
      } catch (error) {
        ModalAlert({ message: 'Erro ao buscar dados do paciente', title: 'Erro', type: 'error' });
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    executeSingleRequest(fetchPatientAndGlucoseData);
  }, [patientId, executeSingleRequest, router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#388B8B" size={50} />
      </div>
    );
  }

  if (!patient) {
    return <div>Paciente não encontrado</div>;
  }

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
        <h1 className={styles.patientName}>{patient.name}</h1>
        <p>Idade: {patient.age}</p>
        <p>Data de Nascimento: {patient.birthDate}</p>
      </div>
      <div className={styles.chartDiv} ref={chartRef} style={{ height: '80vh', width: '100%' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PatientDetails;
