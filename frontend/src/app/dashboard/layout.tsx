import Sidebar from "@/components/ui/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-bio-black text-white">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 relative overflow-hidden">
                {/* Ambient Background Glow */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-bio-green/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
