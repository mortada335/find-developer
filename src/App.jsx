import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { publicRoutes } from "./routes"
import Layout from "./components/layout/Layout"

function App() {
  
  return (
    <>
<Suspense fallback={
    <section className="font-roboto layout">
            <div className="flex justify-center items-center h-screen w-full">
              <span className="loader"></span>
            </div>
          </section>
}>

  <Routes>
             
            <Route path="/" element={<Layout />}>
              {publicRoutes.map(({ path, element, index }) => (
                <Route key={path} path={path} element={element} index={index} />
              ))}
            </Route>


  </Routes>

</Suspense>

    </>
  )
}

export default App
