import Navbar from "@/components/Navbar/Navbar";
import './globals.css';
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export const metadata = {
  title: 'Examina',
  description: 'Centralize e acompanhe seus exames laboratoriais de forma simples e eficiente',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Button label="Voltar" icon={faArrowLeft} variant="back" />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
