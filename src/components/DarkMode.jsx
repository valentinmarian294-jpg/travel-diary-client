import { useEffect, useState } from "react";

function DarkMode() {
    const[dark, setDark] = useState(() => {
        const saved =localStorage.getItem("darkMode")
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        document.body.classList.toggle("dark", dark);
        localStorage.setItem("darkMode", JSON.stringify(dark));
    }, [dark]);

    return(
        <button onClick={() => setDark((prev) => !prev)} className="dark-mode-btn">
            {dark ? "☀️" : "🌙"}
        </button>
    );
}

export default DarkMode

