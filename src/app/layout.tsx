import Navbar from "@/components/Navbar/Navbar";
import "../styles/globals.css"
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Itim&family=Playwrite+DE+Grund:wght@100..400&display=swap"
          rel="stylesheet"></link>
      </head>
      <body>
        <Navbar />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}