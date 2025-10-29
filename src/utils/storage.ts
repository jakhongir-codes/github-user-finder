import type { ColorMode } from "../types";

const getAppThemeFromLocalStorage = (): ColorMode => {
    const stored = localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
}
const setAppThemeToLocalStorage = (theme: "light" | "dark")=> localStorage.setItem("theme", theme)

export {
    getAppThemeFromLocalStorage,
    setAppThemeToLocalStorage
}