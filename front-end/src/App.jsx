
import BaseButton from "./components/BaseButton.jsx";
import RequestButton from "./components/RequestButton.jsx"
import HelloWorldButton from "./components/HelloWorldButton.jsx";
import VoiceFlowButton from "./components/VoiceFlowButton.jsx";

function App() {
  return (
    <div className="App bg-purple-300 flex">
      <div className="flex gap-y-10 w-full flex-col">
        <h1 className="text-center"> Heyyyy make these buttons work please </h1>
        <div className="justify-center flex">
          <BaseButton click={() => console.log("Hello world")} text={"Button 1"} />
        </div>
        
        <div className="justify-center flex">
          <RequestButton/>
        </div>
        <div className="justify-center flex">
          <HelloWorldButton/>
        </div>
        <div className="justify-center flex">
            <VoiceFlowButton/>
        </div>
      </div>
    </div>
  );
}

export default App;
