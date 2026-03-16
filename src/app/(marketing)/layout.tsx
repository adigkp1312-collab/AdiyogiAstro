import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col kundli-watermark" style={{ backgroundColor: '#FFF5E6' }}>
      <Navbar session={null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
