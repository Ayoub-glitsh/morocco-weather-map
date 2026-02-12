import type { Metadata } from 'next';
import { Inter, Noto_Naskh_Arabic } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const notoSansArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic'
});

export const metadata: Metadata = {
  title: 'Morocco Weather Map | خريطة طقس المغرب',
  description: 'Interactive weather map for major Moroccan cities | خريطة طقس تفاعلية للمدن المغربية',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${notoSansArabic.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300" suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
