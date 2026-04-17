import { Navbar } from "@/components/layout/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "#ede0c0" }}>
      <Navbar session={null} />
      <main className="flex-1">{children}</main>
      {/* newspaper page has its own footer inside .mandir-darpan */}
    </div>
  );
}
