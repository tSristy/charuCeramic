import { RouterProvider } from "react-router-dom"
import { RouterConfig } from "./route/RouterConfig"

function App() {

  return (
    <>  
      <RouterProvider router={RouterConfig} />
    </>
  )
}

export default App
