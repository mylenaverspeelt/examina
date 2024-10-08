import styles from "./Button.module.css"

interface ButtonProps {
    label: string;
    onClick?: () => void; 
  }
  
  export default function Button({ label, onClick }: ButtonProps) {
    return (
      <button className={styles.button} onClick={onClick}>
        {label}
      </button>
    );
  }
  