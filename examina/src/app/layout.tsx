import Navbar from "@/components/Navbar/Navbar";
import '../styles/globals.css';
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

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
    <html lang="pt-br">
      <body>
        <Navbar />
        <Button variant="back" label="Voltar" icon={<KeyboardBackspaceIcon />} />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
