import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
    TextInput,
    Group,
    ActionIcon,
    Text,
    Button,
    Stack,
    Textarea,
    Paper,
    Fieldset,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

const schema = z.object({
    domain: z.string().url({ message: "Invalid URL" }),
    title: z.string().nonempty({ message: "Assistant Title required" }),
    featureIds: z
        .array(z.object({ id: z.string().min(1), desc: z.string().min(1) }))
        .min(1, { message: "At least one feature is required" }),
});

export default function AssistantForm({
    initialValues = { featureIds: [{ id: "", desc: "" }], domain: "", title: "", avatar: "" },
    loading = false,
    onSubmit,
    submitLabel = "Save",
}) {
    const form = useForm({
        initialValues,
        validate: zodResolver(schema),
    });

    const fields = form.values.featureIds.map((item, index) => (
        <Group key={index} mt="xs" w="100%">
            <Stack w="85%">
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
            <ActionIcon color="red" onClick={() => form.removeListItem("featureIds", index)}>
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));

    return (
        <Paper w="100%" mx="auto">
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack w="100%">
                    <TextInput
                        placeholder="Assistant Title"
                        withAsterisk
                        style={{ flex: 1 }}
                        mb={10}
                        {...form.getInputProps("title")}
                    />
                    <TextInput
                        placeholder="https://google.com"
                        withAsterisk
                        style={{ flex: 1 }}
                        mb={10}
                        {...form.getInputProps("domain")}
                    />
                </Stack>
                {fields.length > 0 ? null : (
                    <Text c="dimmed" ta="center">
                        No Feature Added yet.
                    </Text>
                )}
                {fields}
                <Group justify="center" mt="md">
                    <Button
                        onClick={() =>
                            form.insertListItem("featureIds", {
                                id: "",
                                desc: "",
                            })
                        }
                        variant="light"
                        type="button"
                    >
                        Add New Feature
                    </Button>
                </Group>
                <Button fullWidth mt={30} type="submit" loading={loading}>
                    {submitLabel}
                </Button>
            </form>
        </Paper>
    );
}
