import type { FC } from 'react';
import AuthLogo from '../../assets/img/AuthLogo.png';

interface AuthPageLayoutProps {
    children: React.ReactNode;
}

const AuthPageLayout: FC<AuthPageLayoutProps> = ({ children }) => {
  return (
    <>
        <div className="min-h-screen flex flex-row">
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col  items-center mb-6">
                        <img src={AuthLogo} alt="Auth Logo" className="h-16 mb-2" />
                        <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
                    </div>

                    {children}
                </div>
            </div>

            <div className=" hidden lg:flex w-1/2 h-screen bg-white justify-center items-center">
                <img 
                src={AuthLogo} 
                alt="Auth Logo" 
                className="object-contain h-full w-full" 
                />
            </div>

        </div>
    </>
  )
}

export default AuthPageLayout