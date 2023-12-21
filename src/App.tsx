import React from "react";

import { MantineProvider } from "@mantine/core";

import Todos from "./components/Todos";
import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider>
      <Todos />
    </MantineProvider>
  );
}

export default App;
