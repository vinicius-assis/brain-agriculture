import TotalCard from "./components/TotalCard";

export default function Home() {
  return (
    <div>
      <TotalCard title="Total Orders" value="84,382" percent="36" />
      <TotalCard title="Total Sales" value="$2,485" percent="14" decrease />
    </div>
  );
}
