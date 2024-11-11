import InputField from './InputField'
import SelectField from './SelectField'
import SubmitButton from './SubmitButton'
import SuccessModal from './SuccessModal'
import { createUser } from '../utils/action'
import { useActionState } from 'react';

const initialState = {
  message: "",
} 

export default function UserForm() {
  const [state, formAction] = useActionState(createUser, initialState)

  return (
    <form action={formAction} className="space-y-4">

      <InputField label="name" name="name" type='text'/>
      <InputField label="email" name="email" type='email'/>
      <SelectField
        label="Role"
        name="role"
        options={[
          { value: 'Admin', label: 'Admin' },
          { value: 'User', label: 'User' }
        ]}
      />

      <SelectField
        label="Status"
        name="status"
        options={[
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
        ]}
      />
      <SubmitButton />

      <span>
        {state?.message && (
          <SuccessModal msg={state?.message}/>
        )}            
      </span>
    </form>
  );
}