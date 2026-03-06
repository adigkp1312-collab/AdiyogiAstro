export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-x-hidden">
      {children}
    </div>
  );
}
