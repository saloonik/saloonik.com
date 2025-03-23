import Image from "next/image";
import Link from "next/link";

export const Navigation = () => (
    <div className="p-5 font-medium flex font-sans text-[#393637] justify-around place-items-center gap-4 bg-stone-200">
        <Link className="" href="/">
            <Image alt="logo" width={150} height={150} src="logo.svg"></Image>
        </Link>
        <span>Home</span>
        <span>Features</span>
        <span>Pricing</span>
        <span>Contact</span>
        <span>Tutorials</span>
        <span>System</span>
    </div>
)