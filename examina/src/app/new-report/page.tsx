'use client'
import styles from './page.module.css';

export default function NewReport() {
  // const [formData, setFormData] = useState({
  //   nome: '',
  //   dataNascimento: '',
  //   glicose: '',
  // });



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New Report</h1>
      <form  className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="nome">Nome:</label>
          <input
          className={styles.input}
            type="text"
            id="nome"
            name="nome"
            // value={formData.nome}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="dataNascimento">Data de Nascimento:</label>
          <input
          className={styles.input}
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            // value={formData.dataNascimento}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="glicose">Resultado Glicose:</label>
          <input
          className={styles.input}
            type="text"
            id="glicose"
            name="glicose"
            // value={formData.glicose}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Finalizar
        </button>
      </form>
    </div>
  );
}
