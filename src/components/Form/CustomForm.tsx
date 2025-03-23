'use client';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
};

type CustomFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  fields: FieldConfig<T>[];
  submitText?: string;
  loading: boolean;
};

export default function CustomForm<T extends FieldValues>({ form, onSubmit, fields, submitText = 'Submit', loading }: CustomFormProps<T>) {
  function ButtonLoading(loading: boolean) {
    if (loading) {
      return (
        <Button disabled={loading} className='w-full'>
          <Loader2 className='animate-spin' />
          Please wait
        </Button>
      );
    }

    return (
      <Button type='submit' className='w-full' disabled={loading}>
        {submitText}
      </Button>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 bg-gray-800 p-6 rounded-lg text-white'>
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input type={field.type || 'text'} placeholder={field.placeholder} {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {ButtonLoading(loading)}
      </form>
    </Form>
  );
}
