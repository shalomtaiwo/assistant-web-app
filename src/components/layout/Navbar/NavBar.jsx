import { IconLogout, IconHome, IconMessage2Share } from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../AuthService";

const data = [
	{ link: "/", label: "Home", icon: IconHome, slug: "/" },
	{
		link: "/widgets",
		label: "Widgets",
		icon: IconMessage2Share,
		slug: "/widgets",
	},
];

export function NavbarSimple({ toggle }) {


	const links = data.map((item) => (
		<Link
			className={classes.link}
			data-active={item.slug === window.location.pathname || undefined}
			to={item.link}
			key={item.label}
			onClick={() => toggle()}
		>
			<item.icon
				className={classes.linkIcon}
				stroke={1.5}
			/>
			<span>{item.label}</span>
		</Link>
	));

	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarMain}>{links}</div>

			<div className={classes.footer}>
				<a
					href="#/"
					className={classes.link}
					onClick={() => logoutUser()}
				>
					<IconLogout
						className={classes.linkIcon}
						stroke={1.5}
					/>
					<span>Logout</span>
				</a>
			</div>
		</nav>
	);
}
