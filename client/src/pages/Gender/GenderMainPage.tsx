import { useEffect, useState } from 'react';
import AddGenderForm from './components/AddGenderForm';
import GenderList from './components/GenderList';
import ToastMessage from '../../components/ToastMessage/ToastMesaage';

const GenderMainPage = () => {
  const [toastMessage, setToastMessage] = useState('')
  const [toastMessageisVisible, setToastMessageisVisible] = useState(false)

  const handleShowToastMessage = (message: string) => {
    setToastMessage(message)
    setToastMessageisVisible(true)
  }

  const handleCloseToastMessage = () => {
    setToastMessage('')
    setToastMessageisVisible(false)
  }

  useEffect(() => {
    document.title = 'Gender Main Page';
  }, []);

  return (
    <>
    <ToastMessage message={toastMessage} isVisible={toastMessageisVisible} onClose={handleCloseToastMessage} />
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <AddGenderForm onGenderAdded={(message) =>{
            handleShowToastMessage(message);
          }} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <GenderList />
        </div>
      </div>
    </>
  );
};

export default GenderMainPage;
