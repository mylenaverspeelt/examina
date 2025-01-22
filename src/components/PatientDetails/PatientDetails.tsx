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
import { GlucoseRecordDTO } from '@/dto/glucose/patientIdGlucose.dto';
import { useSingleRequest } from '@/hooks/useSingleRequest';
import LoadingComponent from '../LoadingComponent/LoadingComponent';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PatientDetailsProps {
  patientId: string;
}

const PatientDetailsContent: React.FC<PatientDetailsProps> = ({ patientId }) => {
  const [data, setData] = React.useState<{
    patient: any;
    glucoseRecords: GlucoseRecordDTO[];
  } | null>(null);
  const executeSingleRequest = useSingleRequest();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await executeSingleRequest(async () => {
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
        });
        setData(result);
      } catch (error) {
      }
    };

    fetchData();
  }, [patientId, executeSingleRequest]);

  if (!data) return <LoadingComponent />;

  const chartData = {
    labels: data.glucoseRecords.map((record: GlucoseRecordDTO) =>
      new Date(record.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Glicose',
        data: data.glucoseRecords.map((record: GlucoseRecordDTO) => record.result),
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
        <h1 className={styles.patientName}>{data.patient.name}</h1>
        <p>Idade: {data.patient.age}</p>
        <p>Data de Nascimento: {data.patient.birthDate}</p>
      </div>
      <div className={styles.chartDiv} style={{ height: '80vh', width: '100%' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId }) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <PatientDetailsContent patientId={patientId} />
    </Suspense>
  );
};

export default PatientDetails;