import { useState } from "react";
import { Toast } from "../../../src/components/Toast";

export function ToastHarness() {
  const [message, setMessage] = useState<string | null>("Settings saved");

  if (!message) {
    return <p>No notification</p>;
  }

  return <Toast message={message} onDismiss={() => setMessage(null)} />;
}
