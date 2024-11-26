export default function LoginLayout({ children }) {
  console.log('Server Render:', typeof window === 'undefined');
  console.log('Client Render:', typeof window !== 'undefined');

  return (
    <div id="root">
      <h1>Header</h1>
      {children}
      <h1>Footer</h1>
    </div>
  );
}
