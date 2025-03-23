'use client';

import { loginAction } from '@/app/actions/loginAction';
import CustomForm from '@/components/Form/CustomForm';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { loginSchema } from '@/lib/validation';
import { useAuthStore } from '@/stores/auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
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
    const response = await loginAction(data);

    if (response.success) {
      setUser(response.user.email);
      toast({
        title: 'Success',
        description: 'Login successful!',
        variant: 'default',
      });

      router.push('/');
    } else {
      toast({
        title: 'Error',
        description: response.message,
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
