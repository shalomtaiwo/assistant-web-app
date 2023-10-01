import { Button } from "@mantine/core";
import { IconBrandTwitter } from "@tabler/icons-react";

export function TwitterButton(props) {
	return (
		<Button
			leftSection={
				<IconBrandTwitter
					style={{ width: "1rem", height: "1rem" }}
					color="#00ACEE"
				/>
			}
			variant="default"
			{...props}
		/>
	);
}
