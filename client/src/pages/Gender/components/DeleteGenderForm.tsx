import BackButton from '../../../components/Button/BackButton';
import SubmitButton from '../../../components/Button/SubmitButton';
import FloatingLabelInput from '../../../components/input/FloatingLabelInput';

const DeleteGenderForm = () => {
  return (
    <>
      <div>
        <form>
          <div className="mb-4">
            <FloatingLabelInput label="Gender" type="text" name="gender" />
          </div>
          <div className="flex justify-end gap-4">
            <BackButton label="Back" path="/" />
            <SubmitButton
              label="Save Gender"
              className="bg-red-600 hover:bg-red-700"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default DeleteGenderForm;
