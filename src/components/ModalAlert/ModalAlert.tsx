"use client"
import Swal from "sweetalert2"

interface ModalAlertProps {
  title: string;
  message: string;
  type?: "error" | "success" | "warning" | "info";
}

export default function ModalAlert({title, type, message }: ModalAlertProps) {
	return Swal.fire({
		icon: type,
		title,
		text: message,
		confirmButtonText: "OK",
	})
}
