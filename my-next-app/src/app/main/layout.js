import Navbar from '@/components/Navbar/Navbar';
import NavbarSecundario from '@/components/NavbarSecundario/NavbarSecundario';

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 p-8 h-screen transition-all duration-300" style={{ marginLeft: '16.6667%' }}>
        <NavbarSecundario />
        {children}
      </main>
    </>
  );
}
