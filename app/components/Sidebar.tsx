import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleGauge, CircleUser, Cog, Settings, UserCog } from "lucide-react";

interface SidebarProps {
    isSidebarExpanded: boolean; // Explicitly type the prop
}
const Sidebar: React.FC<SidebarProps> = ({ isSidebarExpanded }) => {
    const router = usePathname(); // Access the current route
    console.log("Router",router);
    // A helper function to determine if the link is active
    const isActive = (path: string): boolean => router.includes(path);
    return (
        <div className="bg-[var(--primary)] flex flex-col justify-between position-fixed h-[calc(100vh-4rem)]">
            {/* Navigation Links */}
            <nav className="flex flex-col">
                <Link href="/" passHref>
                    <div
                        className={`hover:bg-[var(--secondary)] p-4 flex gap-2 ${isActive('dashboard') ? 'bg-[var(--secondary)]' : ''}`}>
                        <CircleGauge/>
                        <span className="hidden lg:flex">{isSidebarExpanded && "Dashboard"}</span>
                    </div>
                </Link>
                <Link href="/guests/registration/" passHref>
                    <div
                        className={`hover:bg-[var(--secondary)] p-4 flex gap-2 ${isActive('guests') ? 'bg-[var(--secondary)]' : ''}`}>
                        <CircleUser/>
                        <span className="hidden lg:flex">{isSidebarExpanded && "Guests"}</span>
                    </div>
                </Link>
                <Link href="/system/config" passHref>
                    <div
                        className={`hover:bg-[var(--secondary)] p-4 flex gap-2 ${isActive('/system/config') ? 'bg-[var(--secondary)]' : ''}`}>
                        <Cog/>
                        <span className="hidden lg:flex">{isSidebarExpanded && "System Config"}</span>

                    </div>
                </Link>
                <Link href="/settings" passHref>
                    <div className={`hover:bg-[var(--secondary)] p-4 flex gap-2 ${isActive('/settings') ? 'bg-[var(--secondary)]' : ''}`}>
                        <Settings />
                        <span className="hidden lg:flex">{isSidebarExpanded && "Other Settings"}</span>

                    </div>
                </Link>
                <Link href="/admin" passHref>
                    <div className={`hover:bg-[var(--secondary)] p-4 flex gap-2 ${isActive('/admin') ? 'bg-[var(--secondary)]' : ''}`}>
                        <UserCog />
                        <span className="hidden lg:flex">{isSidebarExpanded && "Admin"}</span>

                    </div>
                </Link>
            </nav>

            {/* Optional: Footer or additional links */}
            <div className="mt-auto text-sm text-gray-400">
                {isSidebarExpanded && <p className="hidden lg:flex p-2">Powered by Gtriip</p>}
            </div>
        </div>
    );
};

export default Sidebar;
