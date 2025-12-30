import { RouterProvider } from "react-router-dom"
import { RouterConfig } from "./route/RouterConfig"
import { AuthProvider } from "./route/AuthContext"

function App() {

  return (
    <AuthProvider>  
      <RouterProvider router={RouterConfig} />
    </AuthProvider>
  )
}

export default App
