'use client'
import { faTrash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./Button.module.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Swal from 'sweetalert2';

interface ButtonProps {
  label?: string;
  href?: string;
  icon?: IconDefinition;
  onClick?:  (event: React.MouseEvent) => void;
  variant: 'button' | 'link' | 'back' | 'linkPDF' | 'menuButton';
  id?: number;
  onDelete?: (id: number) => void;
  onDeleted?: () => void; 
}

export default function Button({
  label,
  href,
  icon,
  onClick,
  variant,
  id,
  onDeleted
}: ButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (variant === 'back' && pathname === '/') return null;

  const handleBack = () => {
    router.back();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 

    if (!id) return;

    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    try {
        const response = await fetch('/api/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir o PDF");
        }

        if (onDeleted) {
            onDeleted();
        }

        await Swal.fire('Excluído!', 'O PDF foi excluído com sucesso.', 'success');
    } catch {
        Swal.fire('Erro', 'Falha ao excluir o PDF.', 'error');
    }
  };

  if (variant === 'link' && href) {
    return (
      <Link href={href} className={styles.linkButton}>
        {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
        <span>{label}</span>
      </Link>
    );
  }

  if (variant === 'linkPDF') {
    return (
      <div className={styles.div}>
        <div className={styles.linkContainer}>
          <button onClick={onClick} className={styles.link}>
            {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
            <span className={styles.pdfLabel}>{label}</span>
          </button>
        </div>
        <div className={styles.deleteContainer}>
          <button onClick={handleDelete} className={styles.deleteButton}>
            <FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
          </button>
        </div>
      </div>
    );
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
