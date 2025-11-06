import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WidgetDetails from "./pages/WidgetDetails";
import { ProtectedRoute } from "./ProtectedRoute";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "./components/layout/Layout";
import { Authentication } from "./pages/auth/Authentication";
import WidgetsList from "./pages/Widgets";
import EditAssistant from "./pages/EditAssistant";

const AuthRoute = () => {
	const [user, loading] = useAuthState(auth);
	return (
		<Routes>
			<Route
				exact
				element={
					<ProtectedRoute
						ProtectedRoute
						isAllowed={!!user}
						loading={loading}
					>
						<Layout />
					</ProtectedRoute>
				}
			>
				<Route
					path="/"
					element={<Home user={user} />}
				/>
				<Route
					path="/widgets"
					element={<WidgetsList user={user}  />}
				/>
				<Route
					path="/widgets/:id"
					element={<EditAssistant user={user}  />}
				/>
			</Route>
			<Route
				path="*"
				element={<div>does not exists</div>}
			/>
			<Route path="/auth" element={<Authentication />} />
		</Routes>
	);
};

export default AuthRoute;
