import Navbar from '@/components/Navbar';
import NavbarSecundario from '@/components/NavbarSecundario';

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="border border-red-400 flex-1 p-8 h-screen transition-all duration-300"
        style={{ marginLeft: '16.6667%' }}
      >
        <NavbarSecundario />
        {children}
      </main>
    </>
  );
}
