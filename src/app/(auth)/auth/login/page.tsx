import FormLogin from '../../../../components/Form/formLogin-client';

export const metadata = {
  title: 'Login Page',
  description: 'Login Page',
};

export default function Login() {
  return (
    <div>
      <h1 className='ml-2 mb-2 font-bold text-2xl'>Login</h1>
      <FormLogin />
    </div>
  );
}
