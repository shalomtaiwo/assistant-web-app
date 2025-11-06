import { useForm, zodResolver } from "@mantine/form";
import {
	TextInput,
	Group,
	ActionIcon,
	Text,
	Button,
	Stack,
	Textarea,
	Modal,
	Paper,
	Fieldset,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { z } from "zod";
import { addNavigationList } from "../../../navigate/NavigationList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase-config";
import { useState } from "react";

function ModalForm({ user, close }) {
	const schema = z.object({
		domain: z.string().url({ message: "Invalid URL" }),
		title: z.string().nonempty({ message: "Assistant Title required" }),
	});

	const form = useForm({
		initialValues: {
			featureIds: [{ id: "", desc: "" }],
			domain: "",
			title: "",
		},
		validate: zodResolver(schema),
	});

	const fields = form.values.featureIds.map((item, index) => (
		<Group
			key={item.key}
			mt="xs"
			w={"100%"}
		>
			<Stack w={"85%"}>
				<Fieldset legend="feature details">
					<TextInput
						placeholder="button1"
						withAsterisk
						style={{ flex: 1 }}
						mb={10}
						required
						{...form.getInputProps(`featureIds.${index}.id`)}
					/>
					<Textarea
						placeholder="This button can be clicked this way and that way..."
						withAsterisk
						maxRows={10}
						style={{ flex: 1 }}
						required
						{...form.getInputProps(`featureIds.${index}.desc`)}
					/>
				</Fieldset>
			</Stack>
			<ActionIcon
				color="red"
				onClick={() => form.removeListItem("featureIds", index)}
			>
				<IconTrash size="1rem" />
			</ActionIcon>
		</Group>
	));

	const [loading, setLoading] = useState(false);
	const addAssistant = (features, domain, title, avatar) => {
		setLoading(true);
		addNavigationList(user.uid, features, domain, title, avatar).then(() => {
			console.log("Data added successfully.");
			setLoading(false);
			close();
		});
	};

	// console.log(form.values.avatar);

	return (
		<Paper
			w={"100%"}
			mx="auto"
		>
			<form
				onSubmit={form.onSubmit((values) =>
					addAssistant(values.featureIds, values.domain, values.title)
				)}
			>
				<Stack w={"100%"}>
					<TextInput
						placeholder="Assistant Title"
						withAsterisk
						style={{ flex: 1 }}
						mb={10}
						{...form.getInputProps(`title`)}
					/>
					<TextInput
						placeholder="https://google.com"
						withAsterisk
						style={{ flex: 1 }}
						mb={10}
						{...form.getInputProps(`domain`)}
					/>
				</Stack>
				{fields.length > 0 ? null : (
					<Text
						c="dimmed"
						ta="center"
					>
						No Feature Added yet.
					</Text>
				)}

				{fields}

				<Group
					justify="center"
					mt="md"
				>
					<Button
						onClick={() =>
							form.insertListItem("featureIds", {
								id: "",
								desc: "",
							})
						}
						variant="light"
					>
						Add New Feature
					</Button>
				</Group>

				<Button
					fullWidth
					mt={30}
					type="submit"
					loading={loading}
				>
					Create Assistant
				</Button>
			</form>
		</Paper>
	);
}

export default function AddModal() {
	const [opened, { open, close }] = useDisclosure(false);

	const [user] = useAuthState(auth);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="Assistant Features"
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
			>
				<ModalForm
					user={user}
					close={close}
				/>
			</Modal>

			<Button onClick={open}>Add Assistant</Button>
		</>
	);
}
