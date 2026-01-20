import { Button } from "@/components/ui/button";
import Logo from "@/components/icons/logo";

export default function NavBar() {
    return (
        <div className="flex items-center justify-between h-16 p-4 pl-40 pr-40 shadow-lg bg-white sticky top-0 z-99 w-full">
            <div className="flex items-center justify-center gap-2">
                <Logo />
                <p className="font-serif font-bold  ">ElderKey</p>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button variant="ghost" className={"text-black cursor-pointer"}>
                    Login
                </Button>
                <Button className="rounded-2xl text-black cursor-pointer hover:bg-accent">
                    Get Digital Key
                </Button>
            </div>
        </div>
    );
}
