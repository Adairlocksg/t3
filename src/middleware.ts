import { authMiddleware } from "@clerk/nextjs";

function teste(){
  console.log("teste");
}

export default authMiddleware();

teste();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
