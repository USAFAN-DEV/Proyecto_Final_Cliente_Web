//TODO REPASAR - INCOMPLETO
import RegisterForm from '@/features/register/components/RegisterForm';
import LoginRegisterTitle from '@/components/LoginRegisterTitle';

export default function RegisterPage() {
  return (
    <div className="border border-red-400 flex flex-col p-[10vw_10vh] justify-center items-center w-screen h-screen">
      <div className="rounded-3xl flex flex-col bg-white shadow-md p-[1%]">
        <LoginRegisterTitle />
        <RegisterForm />
      </div>
    </div>
  );
}
