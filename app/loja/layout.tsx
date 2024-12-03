import NaveBar from "@/components/_my_components/NaveBar";
import FooterBar from "@/components/_my_components/FooterBar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LojaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  if(!session){
    return redirect('/login')
  }

  const userName = session.user?.name as string;

  return (
    <section className="h-full">
      <NaveBar userName={userName ?? ""} />
      {children}
      <FooterBar />
    </section>
  );
}
