import React from 'react';
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from 'react-hook-form';
import camelCaseIdentifierToWords from '../../../../utils/camelCaseIdentifierToWords';

export const createControlledFormInput =
  <TInputProps, TFormSchema extends FieldValues>(
    InputComponent: React.FC<TInputProps>,
    boundInputProps: TInputProps
  ) =>
  ({
    control,
    errors,
    name
  }: {
    control: Control<TFormSchema>;
    errors: FieldErrors<TFormSchema>;
    name: FieldPath<TFormSchema>;
  }) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <InputComponent
          error={errors?.[name]?.message}
          label={camelCaseIdentifierToWords(name)}
          {...boundInputProps}
          {...field}
        />
      )}
    />
  );
