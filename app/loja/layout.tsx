import NaveBar from "@/components/_my_components/NaveBar";
import FooterBar from "@/components/_my_components/FooterBar";

export default function LojaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-full">
      <NaveBar />
      {children}
      <FooterBar />
    </section>
  );
}
