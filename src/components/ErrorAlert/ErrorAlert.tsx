'use client';
import Swal from 'sweetalert2';

interface ErrorAlertProps {
  title?: string;
  message: string;
}

export default function ErrorAlert({ title = 'Erro', message }: ErrorAlertProps) {
  return Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonText: 'OK',
  });
}
