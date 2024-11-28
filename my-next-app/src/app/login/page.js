import LoginRegisterTitle from '@/components/LoginRegisterTitle';
import LoginForm from '@/features/login/components/LoginForm';
import GoToRegister from '@/features/login/components/GoToRegister';

export default function Login() {
  return (
    <div className="border border-red-400 flex flex-col p-[10vw_10vh] justify-center items-center w-screen h-screen">
      <div className="rounded-3xl flex flex-col bg-white shadow-md p-[1%]">
        <LoginRegisterTitle />
        <LoginForm />
        <GoToRegister />
      </div>
    </div>
  );
}
