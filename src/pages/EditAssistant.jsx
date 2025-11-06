import { useParams, useNavigate } from "react-router-dom";
import { doc as fsDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import AssistantForm from "../components/AssistantForm";
import { Button, Group, LoadingOverlay, Stack, Title, Modal, Text } from "@mantine/core";
import { useState } from "react";

export default function EditAssistant() {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const ref = user ? fsDoc(db, "users", user.uid, "widgets", id) : null;
    const [snapshot, loading] = useDocument(ref, { snapshotListenOptions: { includeMetadataChanges: true } });
    const [saving, setSaving] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    if (!user) return null;
    if (loading || !snapshot) return <LoadingOverlay visible={true} loader="dot" overlayBlur={2} />;

    const data = snapshot.data() || {};

    // console.log("Fetched Data:", data?.featureId);

    const initialValues = {
        title: data.title || "",
        domain: data.domain || "",
        avatar: data.avatar || "",
        featureIds: data.featureId?.map((feature) => ({ id: feature.id, desc: feature.desc })) || [{ id: "", desc: "" }],
    };

    // console.log("Initial Values:", initialValues);

    const onSubmit = async (values) => {
        setSaving(true);
        try {
            await updateDoc(ref, {
                title: values.title,
                domain: values.domain,
                avatar: values.avatar,
                featureId: values.featureIds,
            });
            navigate(-1);
        } finally {
            setSaving(false);
        }
    };

    const onDelete = async () => {
        await deleteDoc(ref);
        setConfirmOpen(false);
        navigate("/");
    };

    return (
        <Stack maw={800} m="auto" p="md">
            <Group justify="space-between" align="center">
                <Title order={3}>Edit Assistant</Title>
                <Group>
                    <Button color="red" variant="light" onClick={() => setConfirmOpen(true)}>
                        Delete
                    </Button>
                </Group>
            </Group>
            <AssistantForm initialValues={initialValues} loading={saving} onSubmit={onSubmit} submitLabel="Update Assistant" />
            <Modal opened={confirmOpen} onClose={() => setConfirmOpen(false)} title="Delete Assistant">
                <Stack>
                    <Text>Are you sure you want to delete this assistant?</Text>
                    <Group justify="flex-end">
                        <Button variant="default" onClick={() => setConfirmOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="red" onClick={onDelete}>
                            Delete
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Stack>
    );
}
