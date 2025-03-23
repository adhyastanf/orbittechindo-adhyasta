import FormRegister from '@/components/Form/formRegister-client';


export const metadata = {
  title: 'Register Page',
  description: 'Register Page',
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className='ml-2 mb-2 font-bold text-2xl'>Register</h1>
      <FormRegister />
    </div>
  );
}
