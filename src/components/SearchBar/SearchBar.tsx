'use client';
import { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
interface Patient {
  id: number;
  name: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [error, setError] = useState('');
  const [cache, setCache] = useState<Record<string, Patient[]>>({});

  const fetchPatients = async (term: string) => {
    if (cache[term]) {
      setFilteredPatients(cache[term]);
      return;
    }

    setError('');
    try {
      const response = await fetch(`/api/patients?query=${term}`);
      const data = await response.json();
      setCache((prev) => ({ ...prev, [term]: data.patients || [] }));
      setFilteredPatients(data.patients || []);
    } catch {
      setError('Erro ao buscar pacientes. Tente novamente mais tarde.');
      setFilteredPatients([]);
    } finally {
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

  const highlightTerm = (name: string, term: string) => {
    const parts = name.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) => (
      <span
        key={index}
        style={{ fontWeight: part.toLowerCase() === term.toLowerCase() ? 'bold' : 'normal' }}
      >
        {part}
      </span>
    ));
  };

  return (
    <div className={styles.searchContainer}>
      <input
        id="searchInput"
        type="text"
        className={styles.searchInput}
        placeholder="Digite o nome do paciente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Campo de busca de pacientes"
      />
      <SearchIcon className={styles.searchIcon} />
      {error && <div className={styles.error}>{error}</div>}
      {filteredPatients.length > 0 && (
        <ul className={styles.dropdown} role="listbox" aria-label="Resultados da busca">
          {filteredPatients.map((patient) => (
            <li
              key={patient.id}
              className={styles.dropdownItem}
              role="option"
              aria-selected="false"
            >
              <Link href={`/patients/${patient.id}`}>
                {highlightTerm(patient.name, searchTerm)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
