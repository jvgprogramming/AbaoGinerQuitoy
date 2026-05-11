import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { useAuth } from "../contexts/AuthContext";
import type { FC, ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {

    const { user, loading } = useAuth();

    if (loading) {
        return(
            <div className="fixed - inset-0 bg-white  flex items-center justify-center z-50 ">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate to="/ " replace />
        );
    }

    return (
        <>{children}</>
    )
}

export default ProtectedRoute