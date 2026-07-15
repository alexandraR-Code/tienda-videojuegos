import { useState } from "react";
import data from "./data/videojuegos";
import TablaVideojuegos from "./components/TablaVideojuegos";

function App(){
  const [videojuegos, setVideojuegos] = useState(data);

  return (
    <div>
      <h1>Tienda de videojuegos</h1>
      <TablaVideojuegos videojuegos={videojuegos}/>

    </div>
  );
}

export default App;