import { useEffect, useState, type FormEvent } from 'react';
import BackButton from '../../../components/Button/BackButton';
import SubmitButton from '../../../components/Button/SubmitButton';
import FloatingLabelInput from '../../../components/input/FloatingLabelInput';
import { useNavigate, useParams } from 'react-router-dom';
import GenderService from '../../../services/GenderService';
import Spinner from '../../../components/Spinner/Spinner';



const DeleteGenderForm = () => {
  const [loadingGet, setLoadingGet] = useState(false)
  const [loadingDestroy, setLoadingDestroy] = useState(false)
  const [gender, setGender] = useState('')

  const{gender_id} = useParams()
  const navigate = useNavigate()

  const handleGetGender = async (genderId: string | number) => {
    try {
      setLoadingGet(true);

      const response = await GenderService.getGender(genderId);

      if(response.status === 200) {
        setGender(response.data.gender.gender);
      }else {
        console.error('Unexpected status error occured during getting gender:', response.status);
      }
    } catch (error) {
      console.error('Unexpected server error occured during getting gender:', error);
    }finally {
      setLoadingGet(false);
    }
  };

  const handleDestroyGender = async (e: FormEvent) => {
    try {
      e.preventDefault()

      setLoadingDestroy(true)

      const response = await GenderService.destroyGender(gender_id!)

      if (response.status === 200) {
        navigate('/', {state: {message: response.data.message}})
      } else {
        console.error("Unexpected status error occured during deleting gender")
      }
    } catch (error) {
      console.error("Unexpected server error occured during deleting gender")
    }finally {
      setLoadingDestroy(false)
    }
  }

  useEffect(() => {
    if (gender_id) {
      const parsedGenderId = parseInt(gender_id);
      handleGetGender(parsedGenderId);
    } else {
      console.error('Unexpected error occured during getting gender:', gender_id);
    }
  }, [gender_id]);

  return (
    <>
    {loadingGet ? (
      <div className="flex justify-center items-center mt-52">
      <Spinner size="lg"/>
    </div>
    ) : (

        <div>
          <form onSubmit={handleDestroyGender}>
            <div className="mb-4">
              <FloatingLabelInput label="Gender" type="text" name="gender" value={gender} readOnly />
            </div>
            <div className="flex justify-end gap-4">
              {!loadingDestroy && (

              <BackButton label="Back" path="/" />
              )}
              <SubmitButton
                label="Delete Gender"
                className="bg-red-600 hover:bg-red-700"
                loading={loadingDestroy}
                loadingLabel="Deleting Gender..."
              />
            </div>
          </form>
        </div>
    )}
    </>
  );
};

export default DeleteGenderForm;
