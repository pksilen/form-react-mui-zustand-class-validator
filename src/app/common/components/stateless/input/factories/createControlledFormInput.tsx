import React from 'react';
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from 'react-hook-form';
import { camelCaseIdentifierToWords } from 'app/utils/camelCaseIdentifierToWords';

export const createControlledFormInput =
  <TInputProps, TFormSchema extends FieldValues>(
    InputComponent: React.FC<TInputProps>,
    boundInputProps: TInputProps
  ) =>
  ({
    formControl,
    formErrors,
    formFieldName
  }: {
    formControl: Control<TFormSchema>;
    formErrors: FieldErrors<TFormSchema>;
    formFieldName: FieldPath<TFormSchema>;
  }) => (
    <Controller
      control={formControl}
      name={formFieldName}
      render={({ field }) => (
        <InputComponent
          error={formErrors?.[formFieldName]?.message}
          label={camelCaseIdentifierToWords(formFieldName)}
          {...boundInputProps}
          {...field}
        />
      )}
    />
  );
