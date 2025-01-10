'use client';
import styles from './Button.module.css';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';

interface ButtonProps {
  label?: string;
  href?: string;
  icon?: React.ReactNode;  
  onClick?: (event: React.MouseEvent) => void;
  variant: 'button' | 'link' | 'back' | 'linkPDF' | 'menuButton';
  id?: number;
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
      const response = await fetch('/api/deletePdf', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir o PDF');
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
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{label}</span>
      </Link>
    );
  }

  if (variant === 'linkPDF') {
    return (
      <div className={styles.div}>
        <div className={styles.linkContainer}>
          <button onClick={onClick} className={styles.link}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.pdfLabel}>{label}</span>
          </button>
        </div>
        <div className={styles.deleteContainer}>
          <button onClick={handleDelete} className={styles.deleteButton}>
          <DeleteIcon className={styles.trashIcon} />
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <button className={styles.button} onClick={onClick}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{label}</span>
      </button>
    );
  }

  if (variant === 'back') {
    return (
      <button className={styles.backButton} onClick={handleBack}>
        {<span className={styles.icon}>{icon}</span>}
        <span>{label}</span>
      </button>
    );
  }

  if (variant === 'menuButton' && href) {
    return (
      <Link href={href} className={styles.menuButton}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{label}</span>
      </Link>
    );
  }

  return null;
}
