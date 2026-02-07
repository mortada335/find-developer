import { ThemeProvider } from "@/components/theme-provider"
import Layout from "@/components/layouts/layout"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <div>Home Page</div>
      </Layout>
    </ThemeProvider>
  )
}

export default App