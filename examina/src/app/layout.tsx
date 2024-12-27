import Navbar from "@/components/Navbar/Navbar";
import "../styles/globals.css"
import "../styles/typography.css"
import "../styles/colors.css"

import Container from "@/components/Container/Container";

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
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}