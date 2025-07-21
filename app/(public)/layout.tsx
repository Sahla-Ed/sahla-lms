import { ReactNode } from 'react';
import { Navbar } from './_components/Navbar';
import Footer from './_components/Footer';

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className=''>{children}</main>
      <Footer />
    </div>
  );
}
