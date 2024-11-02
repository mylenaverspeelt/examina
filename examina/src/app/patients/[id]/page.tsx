'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from "react-spinners/ClipLoader";

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
        router.push('/'); // Redireciona para a página inicial caso o paciente não seja encontrado
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [params.id, router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
      {/* Exiba outros detalhes conforme necessário */}
    </div>
  );
}
