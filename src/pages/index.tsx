import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";

import MessageInput from "../components/MessageInput";

function App() {
  useEffect(() => {
    listenAsync();
  }, []);

  async function listenAsync() {
    await listen("rcv", (e) => {
      console.log(e);
      console.log(e.payload);
    });
  }

  return (
    <div className="h-screen flex flex-col justify-end gap-4 p-3">
      <div>
        <p>green: Hello</p>
        <p>green: world!</p>
        <p>blue: Si!</p>
      </div>

      <MessageInput />
    </div>
  );
}

export default App;
