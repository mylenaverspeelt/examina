'use client';

import React, { Suspense } from 'react';
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
import styles from './PatientDetails.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

const fetchPatientData = async (patientId: string) => {
  const patientResponse = await fetch(`/api/patients/${patientId}`);
  if (!patientResponse.ok) throw new Error('Paciente não encontrado');
  const patientData = await patientResponse.json();

  const glucoseResponse = await fetch(`/api/patients/${patientId}/glucoseRecords`);
  if (!glucoseResponse.ok) throw new Error('Erro ao buscar registros de glicose');
  const glucoseData = await glucoseResponse.json();

  return {
    patient: patientData.patient,
    glucoseRecords: glucoseData.records,
  };
};

const PatientDetailsContent: React.FC<PatientDetailsProps> = async ({ patientId }) => {
  const { patient, glucoseRecords } = await fetchPatientData(patientId);

  const chartData = {
    labels: glucoseRecords.map((record: GlucoseRecord) =>
      new Date(record.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Glicose',
        data: glucoseRecords.map((record: GlucoseRecord) => record.result),
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
      <div className={styles.chartDiv} style={{ height: '80vh', width: '100%' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const LoadingComponent: React.FC = () => (
  <div className={styles.loadingContainer}>
    <p>Carregando...</p>
  </div>
);

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId }) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <PatientDetailsContent patientId={patientId} />
    </Suspense>
  );
};

export default PatientDetails;
