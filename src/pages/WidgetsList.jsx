import {
	Table,
	Group,
	Text,
	ActionIcon,
	Menu,
	rem,
	Anchor,
	LoadingOverlay,
} from "@mantine/core";
import { IconPencil, IconTrash, IconDots, IconCopy } from "@tabler/icons-react";
import { db } from "../config/firebase-config";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useClipboard } from "@mantine/hooks";

export default function WidgetsList({ user }) {
	const [snapshot, loading, error] = useCollection(
		collection(db, "users", user?.uid, "widgets"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const clipboard = useClipboard({ timeout: 500 });

	const rows =
		!loading &&
		snapshot.docs.map((doc) => (
			<>
				{doc.exists() ? (
					<Table.Tr
						key={doc.data()?.title}
						id={doc.id}
					>
						<Table.Td>
							<Group gap="sm">
								<div>
									<Text
										fz="sm"
										fw={500}
									>
										{doc.data()?.title}
									</Text>
								</div>
							</Group>
						</Table.Td>
						<Table.Td>
							<Anchor
								fz="sm"
								href={doc.data()?.domain}
								target="_blank"
							>
								{doc.data()?.domain}
							</Anchor>
						</Table.Td>
						<Table.Td>
							<Group gap={0}>
								<ActionIcon
									variant="subtle"
									color="gray"
								>
									<IconPencil
										style={{ width: rem(16), height: rem(16) }}
										stroke={1.5}
									/>
								</ActionIcon>
								<Menu
									transitionProps={{ transition: "pop" }}
									withArrow
									position="bottom-end"
									withinPortal
								>
									<Menu.Target>
										<ActionIcon
											variant="subtle"
											color="gray"
										>
											<IconDots
												style={{ width: rem(16), height: rem(16) }}
												stroke={1.5}
											/>
										</ActionIcon>
									</Menu.Target>
									<Menu.Dropdown>
										<Menu.Item
											leftSection={
												<IconCopy
													style={{ width: rem(16), height: rem(16) }}
													stroke={1.5}
												/>
											}
											color="blue"
											onClick={() =>
												clipboard.copy(`
    <script src="https://stellular-dieffenbachia-abdfac.netlify.app/index.js" data-userid=${user.uid} data-assistantid=${doc.id}></script>
  `)
											}
										>
											Copy Script
										</Menu.Item>

										<Menu.Item
											leftSection={
												<IconTrash
													style={{ width: rem(16), height: rem(16) }}
													stroke={1.5}
												/>
											}
											color="red"
										>
											Delete Assistant
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
							</Group>
						</Table.Td>
					</Table.Tr>
				) : (
					<div>No Assistant added!</div>
				)}
			</>
		));

	if (loading)
		return (
			<LoadingOverlay
				visible={true}
				loader={"dot"}
				overlayBlur={2}
			/>
		);

	return (
		<Table.ScrollContainer minWidth={300}>
			<Table verticalSpacing="md">
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Assistant Title</Table.Th>
						<Table.Th>Domain</Table.Th>
						<Table.Th>
							<Group gap={0}>Action</Group>
						</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
}
