// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuIndicator,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
//     NavigationMenuViewport,
//   } from "@/components/ui/navigation-menu"

// const NaveBar = () => {
//     return(
//         <div className="flex justify-between bg-gray-900 h-[10%] w-full align-middle">
//             <div>

//             </div>

//             <div className="flex justify-around align-middle mr-16 w-[50%]">
//             <NavigationMenu>
//                 <NavigationMenuList>
//                 <NavigationMenuItem>
//                     <NavigationMenuContent>
//                         <NavigationMenuLink>Vagas</NavigationMenuLink>
//                     </NavigationMenuContent>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                     <NavigationMenuContent>
//                         <NavigationMenuLink>Configurações</NavigationMenuLink>
//                     </NavigationMenuContent>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                     <NavigationMenuContent>
//                         <NavigationMenuLink>Contato</NavigationMenuLink>
//                     </NavigationMenuContent>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                     <NavigationMenuContent>
//                         <NavigationMenuLink>Sair</NavigationMenuLink>
//                     </NavigationMenuContent>
//                     </NavigationMenuItem>
//                 </NavigationMenuList>
//             </NavigationMenu>
//             </div>

//         </div>
//     )
// }

// export default NaveBar;

"use client";

import { Button } from "@/components/ui/button"; // ShadCN Button
import Link from "next/link";

const NaveBar = (userName: any) => {

  return (
    <header className="fixed top-0 w-full bg-background border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/loja" className="text-xl font-bold">
            <span className="text-primary">MyApp</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/loja/vagas"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Vagas
          </Link>
          <Link
            href="/loja/configuracao"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Configurações
          </Link>
          <Link
            href="/loja/contato"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Contato
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Login/Register */}
          <Button asChild>
            <Link href="/login">{userName || null}</Link>
          </Button>

          {/* Mobile Menu Button
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button> */}
        </div>
      </div>

      {/* Mobile Menu
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-background border-t border-gray-200 dark:border-gray-700">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )} */}
    </header>
  );
};

export default NaveBar;
