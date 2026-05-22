export default function ThemeScript() {
  const code = `
    try {
      const t = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", t);
    } catch (e) {}
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
