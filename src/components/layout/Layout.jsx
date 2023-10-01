import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";
import { NavbarSimple } from "./Navbar/NavBar";
import { Outlet } from "react-router-dom";
import AddModal from "./Modal/AddModal";

export default function BasicAppShell() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md"
		>
			<AppShell.Header>
				<Group
					h="100%"
					px="md"
				>
					<Burger
						opened={opened}
						onClick={toggle}
						hiddenFrom="sm"
						size="sm"
					/>
					<Group justify="flex-end">
                        <AddModal />
                    </Group>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				<NavbarSimple toggle={toggle} />
			</AppShell.Navbar>
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}
