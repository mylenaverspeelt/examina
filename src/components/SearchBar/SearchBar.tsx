'use client';
import { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import { useSingleRequest } from '@/hooks/useSingleRequest';

interface Patient {
  id: number;
  name: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [cache, setCache] = useState<Record<string, Patient[]>>({});
  const executeSingleRequest = useSingleRequest();

  const fetchPatients = async (term: string) => {
    if (cache[term]) {
      setFilteredPatients(cache[term]);
      return;
    }

    try {
      const response = await fetch(`/api/patients?query=${term}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar pacientes');
      }
      const data = await response.json();
      setCache((prev) => ({ ...prev, [term]: data.patients || [] }));
      setFilteredPatients(data.patients || []);
    } catch {
      ErrorAlert({ message: 'Erro ao buscar pacientes. Tente novamente mais tarde.' });
      setFilteredPatients([]);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const delayDebounce = setTimeout(() => {
        executeSingleRequest(() => fetchPatients(searchTerm));
      }, 300);

      return () => clearTimeout(delayDebounce);
    } else {
      setFilteredPatients([]);
    }
  }, [searchTerm, executeSingleRequest]);

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
  );
}
