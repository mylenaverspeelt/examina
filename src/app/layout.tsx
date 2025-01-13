import Navbar from "@/components/Navbar/Navbar";
import "../styles/colors.css"
import Container from "@/components/Container/Container";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import { Afacad_Flux, Itim, Playwrite_DE_Grund } from 'next/font/google';

const afacadFlux = Afacad_Flux({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  display: 'swap',
});

const itim = Itim({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const playwrite = Playwrite_DE_Grund({
  weight: ['100', '400'],
  display: 'swap',
});

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
    <html lang="pt-br" className={`${afacadFlux.className} ${itim.className} ${playwrite.className}`}>
      <body>
        <ThemeProvider>
          <Navbar />
          <Container>
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
