import Header from "./component/HeaderComp";
import Content from "./component/ContentComp";

function App() {

  return(<div className={`flex flex-col justify-center items-center w-full`}>
    <div className="fixed top-0 w-full">
      <Header />
    </div>
    <div className="mt-72px h-screen w-full">
      <Content />
    </div>
  </div>)
}

export default App; 