'use client'
import { faTrash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./Button.module.css"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface ButtonProps {
  label?: string;
  href?: string;
  icon?: IconDefinition;
  onClick?: () => void;
  variant: 'button' | 'link' | 'back' | 'linkPDF' | 'menuButton';
  id?: number;
  onDelete?: (id: number) => void;
}

export default function Button({
  label,
  href,
  icon,
  onClick,
  variant,
  id,
  onDelete
}: ButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (variant === 'back' && pathname === '/') return null;

  const handleBack = () => {
    router.push('/');
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!id) return;

    const confirmed = confirm('Tem certeza que deseja excluir este PDF?');
    if (!confirmed) return;

    if (onDelete) {
      onDelete(id);
    }
  };

  if (variant === 'link' && href) {
    return (<>
      <Link href={href} className={styles.linkButton}>
        {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
       <span>{label}</span>
      </Link>
    </>)
  }

  if (variant === 'linkPDF' && href) {
    return (<div className={styles.linkContainer}>
      <Link href={href} className={styles.link}>
        {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
       <span className={styles.pdfLabel}>{label}</span>
      </Link>
      <button onClick={handleDelete} className={styles.deleteButton}>
        <FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
      </button>
    </div>)
  }

  if (variant === 'button') {
    return (
      <button className={styles.button} onClick={onClick}>
       <span>{label}</span>
      </button>
    );
  }

  if (variant === 'back') {
    return (
      <button className={styles.backButton} onClick={handleBack}>
        {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
       <span>{label}</span>
      </button>
    );
  }

  if (variant === 'menuButton' && href) {
    return (
      <Link href={href} className={styles.menuButton}>
        {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
       <span>{label}</span>
      </Link>
    );
  }

  return null;
}
