import { doc, getDoc, addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase-config";

const addNavigationList = async (userId, featureId, domain, title) => {
	try {
		const userRef = collection(db, "users", userId, "widgets");
		await addDoc(userRef, {
			domain: domain,
			title: title,
			featureId,
		})
	} catch (error) {
		console.error("Error adding navigation list: ", error);
		throw error;
	}
};

// Retrieve user's navigation list from Firestore
const getNavigationList = async (userId) => {
	try {
		const userRef = doc(db, "users", userId);
		const docSnap = await getDoc(userRef);
		if (docSnap.exists()) {
			return docSnap.data().featureId;
		} else {
			console.log("No feature list found for the user.");
			return null;
		}
	} catch (error) {
		console.error("Error getting navigation list: ", error);
		throw error;
	}
};

const getAllNavigationList = async (userId, docId) => {
	try {
		const userRef = doc(db, "users", userId, "widgets", docId);
		const docSnap = await getDocs(userRef);
		if (docSnap.exists()) {
			console.log(docSnap.data());
		} else {
			console.log("No feature list found for the user.");
			return null;
		}
	} catch (error) {
		console.error("Error getting navigation list: ", error);
		throw error;
	}
};

export { addNavigationList, getNavigationList, getAllNavigationList };
