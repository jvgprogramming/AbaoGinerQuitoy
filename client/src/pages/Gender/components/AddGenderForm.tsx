import { useState, type FC, type FormEvent } from 'react';
import SubmitButton from '../../../components/Button/SubmitButton';
import FloatingLabelInput from '../../../components/input/FloatingLabelInput';
import GenderService from '../../../services/GenderService';
import type { GenderFieldErrors } from '../../../interfaces/GenderFieldErrors';

interface AddGenderFormProps{
  onGenderAdded: (message: string) => void
}

const AddGenderForm: FC<AddGenderFormProps> = ({onGenderAdded}) => {
  const [loadingStore, setLoadingStore] = useState(false)
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState<GenderFieldErrors>({});

  const handleStore = async (e: FormEvent) => {
    try{
      e.preventDefault();

      setLoadingStore(true);

      const data = await GenderService.storeGender({ gender })

      if (data && typeof data.message === 'string') {
        setGender('');
        setErrors({});
        onGenderAdded(data.message)
      } else {
        console.error('Unexpected error occured during store gender:', data)
    }
  } catch(error:any) {
    if(error.response && error.response.status === 422) {
      setErrors(error.response.data.errors)
    }else {
      console.error("Unexpected server error occured during store gender: ", error)
    }
  }
  finally{
    setLoadingStore(false)
  }
}

  return (
    <>
      <form onSubmit={handleStore}>
        <div className="mb-4">
          <FloatingLabelInput label="Gender" type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}
          required
          autoFocus
          errors={errors.gender} 
           />
        </div>
        <div className="flex justify-end">
          <SubmitButton label="Save Gender" loading={loadingStore} loadingLabel='Saving Gender' />
        </div>
      </form>
    </>
  );
};

export default AddGenderForm;
