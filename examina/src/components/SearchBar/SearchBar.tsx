'use client';
import { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Patient {
  id: number;
  name: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPatients = async (term: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/patients?query=${term}`);
      const data = await response.json();
      setFilteredPatients(data.patients || []);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      setFilteredPatients([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const delayDebounce = setTimeout(() => {
        fetchPatients(searchTerm);
      }, 300);

      return () => clearTimeout(delayDebounce);
    } else {
      setFilteredPatients([]);
    }
  }, [searchTerm]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Pesquisar paciente..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      {isLoading && <div className={styles.loading}></div>}
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
