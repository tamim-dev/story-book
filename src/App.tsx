import { Suspense } from "react";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
