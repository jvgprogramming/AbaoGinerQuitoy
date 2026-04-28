import { useModal } from '../../hooks/useModal';
import { useToastMessage } from '../../hooks/useToastMessage';
import AddUserFormModal from './components/AddUserFormModal';
import UserList from './components/UserList';
import ToastMessage from '../../components/ToastMessage/ToastMesaage';

const UserMainPage = () => {
  const { isOpen, openModal, closeModal } = useModal(false);

  const {message: toastMessage, isVisible: toastMessageIsVisible, showToastMessage, closeToastMessage,} = useToastMessage('', false)

  return (
    <>
      <ToastMessage message={toastMessage} isVisible={toastMessageIsVisible} onClose={closeToastMessage}/>

        <AddUserFormModal isOpen={isOpen} onClose={closeModal}  onUserAdded={showToastMessage} />
        <UserList onAddUser={openModal} />
      </>
    );
  };

  export default UserMainPage;
