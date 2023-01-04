import { useState } from "react";
import Child from "./components/Child";
import Parent from "./components/Parent";

function App() {
  const [isParentVisible, setParentVisible] = useState(false);
  const [isChildVisible, setChildVisible] = useState(false);

  const onOpenParentPopup = () => {
    setParentVisible(true);
  };

  const onCloseParentPopup = () => {
    setParentVisible(false);
  };

  const showChild = () => {
    setParentVisible(false);
    setChildVisible(true);
  };

  const hideChild = () => {
    setChildVisible(false);
    setParentVisible(true);
  };

  return (
    <div>
      <button onClick={onOpenParentPopup}>Open parent</button>
      {isParentVisible ? (
        <Parent hideParent={onCloseParentPopup} onShowChildPopup={showChild} />
      ) : null}
      {isChildVisible ? <Child onCloseChild={hideChild} /> : null}
    </div>
  );
}

export default App;
