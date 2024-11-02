'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./page.module.css"
interface Patient {
  id: number;
  name: string;
  age: string;
  birthDate: string;
}

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`/api/patients/${params.id}`);
        if (!response.ok) {
          throw new Error("Paciente não encontrado");
        }
        const data = await response.json();
        setPatient(data.patient);
      } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        router.push('/'); 
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
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

  return (
    <div>
      <h1>{patient.name}</h1>
      <p>Idade: {patient.age}</p>
      <p>Data de Nascimento: {patient.birthDate}</p>
    </div>
  );
}