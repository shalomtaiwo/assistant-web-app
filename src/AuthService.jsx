// AuthService.js
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "./config/firebase-config";

// User registration
export const registerUser = async (email, password, setLoading) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password).then(() => {});
		console.log("Account created successfully");
		setTimeout(() => {
			setLoading(false);
			window.location.replace("/");
		}, 2000);
	} catch (error) {
		console.error("Error registering user: ", error);
		throw error;
	}
};

// User login
export const loginUser = async (email, password, setLoading) => {
	try {
		await signInWithEmailAndPassword(auth, email, password).then(() => {
			console.log("Logged in successfully");
			setTimeout(() => {
				setLoading(false);
				window.location.replace("/");
			}, 2000);
		});
	} catch (error) {
		console.error("Error logging in: ", error);
		throw error;
	}
};

// User logout
export const logoutUser = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error("Error logging out: ", error);
		throw error;
	}
};
