import Image from 'next/image';

export default function MainPage() {
  return (
    <>
      <div className="relative w-[80%] ml-[10%] flex items-center justify-center" style={{ aspectRatio: 1280 / 800 }}>
        <Image src="/images/main/pagina-en-desarrollo.png" alt="Pagina en desarrollo" fill />
      </div>
    </>
  );
}
