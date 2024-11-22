import { authOptions } from "@/config/auth.config";
import NextAuth from "next-auth";
import { validateEnv } from "@/lib/env";

validateEnv();

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
