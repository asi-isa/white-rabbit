import MessageInput from "../components/MessageInput";

function App() {
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
