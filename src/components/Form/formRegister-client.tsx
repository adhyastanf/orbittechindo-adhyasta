'use client';

import CustomForm from '@/components/Form/CustomForm';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { fetchRegister } from '@/lib/services';
import { registerSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, Path, useForm } from 'react-hook-form';
import z from 'zod';

type RegisterFormData = z.infer<typeof registerSchema>;

type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
};

export default function FormRegister() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { name, email, password } = data;

    try {
      const response = await fetchRegister(name, email, password);
      if (!response || !response.user) {
        throw new Error(response.message || 'Invalid response from server');
      }
      toast({
        title: 'Success',
        description: 'Registration successful!',
        variant: 'default',
      });
      router.push('/auth/login');
    } catch (err) {
      console.log(err);
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

  const fieldsList: FieldConfig<RegisterFormData>[] = [
    { name: 'name', type: 'text', placeholder: 'Enter your name', label: 'Name' },
    { name: 'email', type: 'email', placeholder: 'Enter your email', label: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Enter your password', label: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm your password', label: 'Confirm Password' },
  ];

  return (
    <Form {...form}>
      <CustomForm form={form} fields={fieldsList} onSubmit={onSubmit} loading={form.formState.isSubmitting} />
      <p className='text-sm text-gray-600 mt-4 text-center'>
        Sudah punya akun?{' '}
        <Link href='/auth/login' className='text-blue-500 hover:text-blue-600 font-semibold cursor-pointer transition'>
          Sign In
        </Link>
      </p>
    </Form>
  );
}
