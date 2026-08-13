import { createContext, useContext, useState, type ReactNode } from "react";
import { Toast } from "../../components";

type PlaygroundToastContextValue = {
  notify: (message: string) => void;
};

const PlaygroundToastContext = createContext<PlaygroundToastContextValue | null>(
  null,
);

export function PlaygroundToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <PlaygroundToastContext.Provider value={{ notify: setMessage }}>
      {children}
      {message ? (
        <Toast message={message} onDismiss={() => setMessage(null)} />
      ) : null}
    </PlaygroundToastContext.Provider>
  );
}

export function usePlaygroundToast() {
  const context = useContext(PlaygroundToastContext);

  if (!context) {
    throw new Error("usePlaygroundToast must be used within PlaygroundToastProvider");
  }

  return context;
}
