import {  LoadingOverlay } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isAllowed, redirectPath = "/auth", loading, children }) => {
    if (loading) {
        return <LoadingOverlay visible={true} loader={'dot'} overlayBlur={2} />
    }
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};