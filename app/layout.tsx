import {
  Anton,
  Abel,
  Bona_Nova_SC,
  Averia_Sans_Libre,
  Caveat,
} from 'next/font/google';
import './globals.css';

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
      className={`${anton.variable} ${abel.variable} ${title.variable} ${body.variable} ${hand.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}