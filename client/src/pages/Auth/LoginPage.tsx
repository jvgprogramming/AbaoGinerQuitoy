
import AuthPageLayout from "./AuthPageLayout"
import LoginForm from "./components/LoginForm"
import ToastMessage from "../../components/ToastMessage/ToastMesaage";
import { useToastMessage } from "../../hooks/useToastMessage";


const LoginPage = () => {

  const { message, isVisible, isFailed, showToastMessage, closeToastMessage} = useToastMessage("", false, false);


  return (
    <>
        <AuthPageLayout>
          <ToastMessage message={message} isVisible={isVisible} isFailed={isFailed} onClose={closeToastMessage} />
          <LoginForm message={showToastMessage} />
        </AuthPageLayout>
    </>
  )
}

export default LoginPage