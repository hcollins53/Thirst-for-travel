
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { ThirstForTravel } from "./ThirstForTravel"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
