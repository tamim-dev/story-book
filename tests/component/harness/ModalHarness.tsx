import { useState } from "react";
import { Button } from "../../../src/components/Button";
import { Modal } from "../../../src/components/Modal";

export function ModalHarness({ startOpen = false }: { startOpen?: boolean }) {
  const [open, setOpen] = useState(startOpen);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} title="Add User" onClose={() => setOpen(false)}>
        <p>Create a playground user.</p>
      </Modal>
    </div>
  );
}
