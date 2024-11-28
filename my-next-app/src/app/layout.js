import './globals.css';

export const metadata = {
  title: 'Hacienda',
  description: 'Hola, soy Hacienda',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">{children}</body>
    </html>
  );
}
