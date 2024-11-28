// import { CopyrightIcon } from "lucide-react";

// const FooterBar = () => {
//     return <footer className="flex justify-center bg-gray-900 h-[10%] w-full items-center">
//         <h1 className="flex align-middle">
//             <CopyrightIcon className="mr-2" /> FooterBar 2024
//         </h1>
//     </footer>
// }

// export default FooterBar;

import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react"; // Ícones para redes sociais

const Footer = () => {
  return (
    <footer className="bg-background border-t border-gray-200 dark:border-gray-700 py-6 max-h-24">
      <div className="container mx-auto px-4">
        {/* Top Section: Links e Informações */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Informação da Empresa */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h4 className="text-lg font-bold text-primary">MyApp</h4>
            <p className="text-sm text-muted-foreground">
              Simplificando sua experiência.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/terms"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Termos de Uso
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Suporte
            </Link>
          </div>
        </div>

        {/* Bottom Section: Redes Sociais */}
        <div className="mt-6 flex justify-center md:justify-between items-center">
          {/* Redes Sociais */}
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          {/* Direitos Autorais */}
          <p className="text-sm text-muted-foreground text-center md:text-right mt-4 md:mt-0">
            &copy; 2024 MyApp. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
