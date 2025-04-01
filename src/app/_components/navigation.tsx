import Image from "next/image";
import Link from "next/link";

export const Navigation = () => (
    <div className="p-5 font-medium flex font-sans text-[#393637] justify-around place-items-center gap-4 bg-stone-200">
        <Link href="/">
            <Image alt="logo" width={150} height={150} src="logo.svg"></Image>
        </Link>
        <Link href={'/'}>Strona Główna</Link>
        <a href="#features">Funkcje</a>
        <a href="#pricing">Cennik</a>
        <a href="#contact">Kontakt</a>
        <a href="#tutorials">Poradniki</a>
        <a href="https://system.saloonik.com/register">System</a>
    </div>
)