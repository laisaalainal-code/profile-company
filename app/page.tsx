import Image from "next/image";
import { MenuLandingPage } from "./components/landing-page-menu/page";

export default function Home() {
  return (
     <main className="flex flex-1 w-full min-h-screen bg-white dark:bg-black">
  <div className="w-full h-[80px] bg-blue-800 dark:bg-blue-800 rounded-[70px] flex  mt-4 mx-8 p-4 gap-4">
    
    <div className="relative w-[230px] h-[50px] rounded-[70px] items-center justify-start">
      <Image 
      src="/img/smk_mvp_ars_logo_white.png" alt="logo"  fill />  
    </div>
    <div className="flex flex-1 items-center justify-center">
      <MenuLandingPage/>
    </div>

  </div>
</main>
    
  );
}
