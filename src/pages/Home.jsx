import { Flex, Paper, Text, Title } from "@mantine/core";
import React from "react";

const Home = ({ user }) => {
	return (
		<div>
			<Title order={3}>Welcome to your favorite assistant!</Title>

			<Paper mt={20} style={{border: '1px solid grey'}} p={20}>
				<Text mb={20}>Personal Details</Text>
    
				<Flex>
					<Text fw={700}>Email:</Text>
					<Text ml={15}>{user?.email}</Text>
				</Flex>
			</Paper>
		</div>
	);
};

export default Home;
