'use client';

import { registerAction } from '@/app/actions/registerAction';
import CustomForm from '@/components/Form/CustomForm';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { registerSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
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
    const response = await registerAction(data);

    if (response.success) {
      toast({
        title: 'Success',
        description: 'Registration Successful!',
        variant: 'default',
      });
      router.push('/auth/login');
    } else {
      toast({
        title: 'Error',
        description: response.message,
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
        Sudah punya akun? {' '}
        <Link href='/auth/login' className='text-blue-500 hover:text-blue-600 font-semibold cursor-pointer transition'>
          Sign In
        </Link>
      </p>
    </Form>
  );
}
