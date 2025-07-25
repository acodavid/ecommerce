import Image from 'next/image';
import loader from '@/assets/loader.gif';

const LoadingPage = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.95)',
      }}
    >
      <Image src={loader} height={150} width={150} alt='Учитавам...' />
    </div>
  );
};

export default LoadingPage;
