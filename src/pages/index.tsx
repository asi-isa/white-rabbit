import Chat from "../components/Chat";
import Divider from "../components/Divider";
import Menu from "../components/Menu";
import { useRequestOwnIpPort } from "../hooks";

function App() {
  useRequestOwnIpPort();

  return (
    <div className="flex">
      <Menu />

      <Divider />

      <Chat />
    </div>
  );
}

export default App;
