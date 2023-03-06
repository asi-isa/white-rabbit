import Chat from "../components/Chat";
import Divider from "../components/Divider";
import Menu from "../components/Menu";

function App() {
  return (
    <div className="flex">
      <Menu />

      <Divider />

      <Chat />
    </div>
  );
}

export default App;
