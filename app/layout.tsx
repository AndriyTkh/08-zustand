import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import "./global.css"

export const metadata: Metadata = {
  title: "NoteHub – Manage Your Notes Easily",
  description: "NoteHub is a modern note-taking app with search, filtering, and more.",
  openGraph: {
    title: "NoteHub – Manage Your Notes Easily",
    description: "NoteHub is a modern note-taking app with search, filtering, and more.",
    url: "https://08-zustand-xi-dun.vercel.app/", // what sould be here?
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview image",
      },
    ],
  },
};

const roboto = Roboto({
  weight: ["400", "700"],        // Normal + Bold
  subsets: ["latin"],            // Latin alphabet
  variable: "--font-roboto",     // CSS variable name
  display: "swap",               // Improve loading performance
});

type RootLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({
  children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>{children}{modal}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
