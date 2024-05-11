import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FieldPath, useForm } from 'react-hook-form';
import { ErrorAlert } from 'app/common/components/stateless/alerts/ErrorAlert';
import { SubmitButton } from 'app/common/components/stateless/buttons/SubmitButton';
import { TextInput, TextInputProps } from 'app/common/components/stateless/input/TextInput';
import { createControlledFormInput } from 'app/common/components/stateless/input/factories/createControlledFormInput';
import { User } from 'app/stores/User';
import { useUserStore } from 'app/stores/userStore';
import classes from './UserRegistrationForm.module.scss';

const ControlledFormTextInput = createControlledFormInput<TextInputProps, User>(TextInput, {
  maxLength: 128,
  required: true
});

const defaultValues = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  zipCode: '',
  city: '',
  email: '',
  phoneNumber: ''
};

export const UserRegistrationForm = () => {
  const error = useUserStore((store) => store.error);
  const registerUser = useUserStore((store) => store.actions.registerUser);

  const {
    control: formControl,
    formState: { errors: formErrors },
    handleSubmit,
    reset: resetForm
  } = useForm<User>({
    defaultValues,
    resolver: classValidatorResolver(User)
  });

  const handleUserRegistration = handleSubmit(async (user) => {
    const userWasRegistered = await registerUser(user);

    if (userWasRegistered) {
      resetForm();
    }
  });

  const createTextInput = (formFieldName: FieldPath<User>) => (
    <ControlledFormTextInput
      formControl={formControl}
      formErrors={formErrors}
      formFieldName={formFieldName}
    />
  );

  return (
    <form className={classes.form} onSubmit={handleUserRegistration}>
      <fieldset className={classes.inlineFields}>
        {createTextInput('firstName')}
        {createTextInput('lastName')}
      </fieldset>
      {createTextInput('streetAddress')}
      <fieldset className={classes.inlineFields}>
        {createTextInput('zipCode')}
        {createTextInput('city')}
      </fieldset>
      {createTextInput('email')}
      {createTextInput('phoneNumber')}
      <SubmitButton className={classes.button}>Register</SubmitButton>
      {error && (
        <ErrorAlert classes={classes.alert}>Registration failed. Please try again.</ErrorAlert>
      )}
    </form>
  );
};
