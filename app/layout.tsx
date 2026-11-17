import {
  Anton,
  Abel,
  Bona_Nova_SC,
  Averia_Sans_Libre,
  Caveat,
  Asap_Condensed
} from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from './lib/registry';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const abel = Abel({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-abel',
  display: 'swap',
});


const asapCondensed = Asap_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-asap-condensed",
  display: 'swap', // <-- Adicionado
});

const title = Bona_Nova_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-bona-nova-sc',
  display: 'swap',
});

const body = Averia_Sans_Libre({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-averia-sans-libre',
  display: 'swap',
});

const hand = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${abel.variable} ${title.variable} ${body.variable} ${hand.variable} ${asapCondensed.variable}`}
    >
      <body className="font-body antialiased">
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}