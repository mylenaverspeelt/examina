import Navbar from "@/components/Navbar/Navbar";
import './globals.css';
import Container from "@/components/Container/Container";
import BackButton from "@/components/BackButton/BackButton"; 

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
        <BackButton />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
