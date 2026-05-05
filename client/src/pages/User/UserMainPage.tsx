import { useModal } from '../../hooks/useModal';
import { useToastMessage } from '../../hooks/useToastMessage';
import AddUserFormModal from './components/AddUserFormModal';
import UserList from './components/UserList';
import ToastMessage from '../../components/ToastMessage/ToastMesaage';
import EditUserFormModal from './components/EditUserFormModal';
import { useRefresh } from '../../hooks/useRefresh';

const UserMainPage = () => {
  const { isOpen: isAddOpen, openModal: openAddModal, closeModal: closeAddModal } = useModal(false);
  const { isOpen: isEditOpen, selectedUser, openModal: openEditModal, closeModal: closeEditModal } = useModal(false);

  const {message: toastMessage, isVisible: toastMessageIsVisible, showToastMessage, closeToastMessage,} = useToastMessage('', false)

  const { refresh , handleRefresh} = useRefresh(false)

  return (
    <>
        <ToastMessage message={toastMessage} isVisible={toastMessageIsVisible} onClose={closeToastMessage}/>

        <AddUserFormModal isOpen={isAddOpen} refreshKey={handleRefresh} onClose={closeAddModal} onUserAdded={showToastMessage} />

        <UserList onAddUser={openAddModal} onEditUser={(user) => openEditModal(user)} refreshKey={refresh} />

        <EditUserFormModal user={selectedUser} onUserUpdate={showToastMessage} refreshKey={handleRefresh} isOpen={isEditOpen} onClose={closeEditModal} />

      
      </>
    );
  };

  export default UserMainPage;
