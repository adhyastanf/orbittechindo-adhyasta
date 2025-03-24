'use client';

import CustomForm from '@/components/Form/CustomForm';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { fetchLogin } from '@/lib/services';
import { loginSchema } from '@/lib/validation';
import { useAuthStore } from '@/stores/auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, Path, useForm } from 'react-hook-form';
import z from 'zod';

type LoginFormData = z.infer<typeof loginSchema>;

type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
};

export default function FormLogin() {
  const { toast } = useToast();
  const { setUser } = useAuthStore();
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    try {
      const response = await fetchLogin(email, password);
      if (!response || !response.user) {
        throw new Error(response.message || 'Invalid response from server');
      }
      setCookie('tmdb_api_key',response.token)
      setUser(response.user.email);
      router.push('/');
      toast({
        title: 'Success',
        description: 'Login successful!',
        variant: 'default',
      });
    } catch (err) {
      console.log(err)
      let errorMessage = 'Something went wrong. Please try again.';
    
    if (err instanceof AxiosError) {
      errorMessage = err.response?.data?.message || errorMessage;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });
  }
  };

  const fieldsList: FieldConfig<LoginFormData>[] = [
    { name: 'email', type: 'email', placeholder: 'Enter your email', label: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Enter your password', label: 'Password' },
  ];

  return (
    <Form {...form}>
      <CustomForm form={form} fields={fieldsList} onSubmit={onSubmit} loading={form.formState.isSubmitting} />
      <p className='text-sm text-gray-600 mt-4 text-center'>
        Belum punya akun?{' '}
        <Link href='/auth/register' className='text-blue-500 hover:text-blue-600 font-semibold cursor-pointer transition'>
          Sign Up
        </Link>
      </p>
    </Form>
  );
}
