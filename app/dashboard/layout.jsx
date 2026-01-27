import DashboardNavBar from "@/components/custom/DashboardNavBar";
import Footer from "@/components/custom/Footer"; // Assuming we want the footer here too, or we can omit it if design requires no footer. Usually dashboards have footer.

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
            <DashboardNavBar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
