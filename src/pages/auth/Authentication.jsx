import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	Button,
	Divider,
	Anchor,
	Stack,
} from "@mantine/core";
import { loginUser, registerUser } from "../../AuthService";
import { useState } from "react";

export function Authentication(props) {
	const [type, toggle] = useToggle(["login", "register"]);

	const [loading, setLoading] = useState(false);

	const form = useForm({
		initialValues: {
			email: "",
			name: "",
			password: "",
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
			password: (val) =>
				val.length <= 2
					? "Password should include at least 2 characters"
					: null,
		},
	});

	const handleAuth = () => {
		setLoading(true);
		if (type === "register") {
			registerUser(form.values.email, form.values.password, setLoading);
		} else {
			loginUser(form.values.email, form.values.password, setLoading);
		}
	};

	return (
		<Paper
			p={20}
			h={"100vh"}
			w={"100vw"}
			style={{
				display: "flex",
				placeContent: "center",
				alignItems: "center",
			}}
		>
			<Paper
				radius="md"
				p="xl"
				withBorder
				w={400}
				h={"fit-content"}
				{...props}
			>
				<Text
					size="lg"
					fw={500}
				>
					Welcome to Assistant, {type} with Email
				</Text>

				<Divider
					labelPosition="center"
					my="lg"
				/>

				<form onSubmit={form.onSubmit((values) => handleAuth())}>
					<Stack>
						{/* {type === "register" && (
							<TextInput
								label="Name"
								placeholder="Your name"
								value={form.values.name}
								required
								onChange={(event) =>
									form.setFieldValue("name", event.currentTarget.value)
								}
								radius="md"
							/>
						)} */}

						<TextInput
							required
							label="Email"
							placeholder="hello@assistant.dev"
							value={form.values.email}
							onChange={(event) =>
								form.setFieldValue("email", event.currentTarget.value)
							}
							error={form.errors.email && "Invalid email"}
							radius="md"
						/>

						<PasswordInput
							required
							label="Password"
							placeholder="Your password"
							value={form.values.password}
							onChange={(event) =>
								form.setFieldValue("password", event.currentTarget.value)
							}
							error={
								form.errors.password &&
								"Password should include at least 6 characters"
							}
							radius="md"
						/>
					</Stack>

					<Group
						justify="space-between"
						mt="xl"
					>
						<Anchor
							component="button"
							type="button"
							c="dimmed"
							onClick={() => toggle()}
							size="xs"
						>
							{type === "register"
								? "Already have an account? Login"
								: "Don't have an account? Register"}
						</Anchor>
						<Button
							type="submit"
							radius="xl"
							loading={loading}
						>
							{upperFirst(type)}
						</Button>
					</Group>
				</form>
			</Paper>
		</Paper>
	);
}
