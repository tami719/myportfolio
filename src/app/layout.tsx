import './globals.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Takumi Ohashi Portfolio',
  description: 'Takumi Ohashi\'s portfolio website. Explore projects and skills.',
  keywords: ['portfolio', 'Takumi Ohashi', 'projects'],
  authors: [{ name: 'Takumi Ohashi' }],
  robots: 'index, follow',
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION!,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body>
        <div className="layout-container">
          {children}
        </div>
      </body>
    </html>
  );
}
