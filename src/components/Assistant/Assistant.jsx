// src/components/Assistant.js
import React, { useState, useEffect } from "react";
import "./Assistant.css";
import { useMouse } from "@mantine/hooks";
import { getNavigationList } from "../../navigate/NavigationList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";

function Assistant() {
	const { x, y } = useMouse();
	const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
	const [featureIds, setFeatureIds] = useState([]);
	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		// Fetch user's data from Firestore
		!loading &&
			getNavigationList(user.uid)
				.then((userFeatureIds) => {
					if (userFeatureIds) {
						// Save the user's feature IDs in the state
						setFeatureIds(userFeatureIds);
					}
				})
				.catch((error) => {
					console.error("Error fetching user data:", error);
				});
	}, []);

	useEffect(() => {
		const handleClick = (event) => {
			const clickedElement = event.target;
			const clickedId = clickedElement.id;

			const isFeatureClicked = featureIds.some(
				(feature) => feature.id === clickedId
			);

			if (isFeatureClicked) {
				console.log(isFeatureClicked);
				setTargetPosition({ x: x - 10, y: y });
			}
		};

		// Add event listener to the entire document to capture clicks on any element
		document.addEventListener("click", handleClick);

		// Clean up the event listener when the component unmounts
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [featureIds, x, y]);

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<div
				id="target"
				style={{
					position: "absolute",
					width: "40px",
					height: "40px",
					left: `${targetPosition.x}px`,
					top: `${targetPosition.y}px`,
					backgroundColor: "red",
					transition:
						"left 1.5s cubic-bezier(0.42, -0.3, 0.78, 1.25), top 1.5s cubic-bezier(0.42, -0.3, 0.78, 1.25)",
				}}
			>
				Target
			</div>
			{/* Your other content */}
		</div>
	);
}

export default Assistant;
