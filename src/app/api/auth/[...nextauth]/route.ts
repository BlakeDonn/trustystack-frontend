import { authOptions } from "@/config/auth.config";
import { validateEnv } from "@/lib/env";
import NextAuth from "next-auth";

validateEnv();

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
