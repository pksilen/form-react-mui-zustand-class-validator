import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorAlert } from '../../common/components/stateless/alerts/ErrorAlert';
import { SubmitButton } from '../../common/components/stateless/buttons/SubmitButton';
import { createControlledFormInput } from '../../common/components/stateless/input/createControlledFormInput';
import { TextInput, TextInputProps } from '../../common/components/stateless/input/TextInput';
import { User } from '../../stores/User';
import { useUserStore } from '../../stores/userStore';
import classes from './UserRegistration.module.scss';

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

export const UserRegistration = () => {
  const error = useUserStore((store) => store.error);
  const createUser = useUserStore((store) => store.actions.createUser);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset: resetForm
  } = useForm<User>({
    defaultValues,
    resolver: classValidatorResolver(User)
  });

  const onSubmit: SubmitHandler<User> = async (user) => {
    const userWasCreated = await createUser(user);

    if (userWasCreated) {
      resetForm();
    }
  };

  const createTextInput = (name: FieldPath<User>) => (
    <ControlledFormTextInput control={control} errors={errors} name={name} />
  );

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
