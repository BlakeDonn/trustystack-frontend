import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

interface WithAuthOptions {
  redirectTo?: string;
  allowedRoles?: string[];
}

export default function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isChecking, setIsChecking] = useState(true);

    const { redirectTo = "/", allowedRoles = [] } = options;

    useEffect(() => {
      if (status === "loading") return;

      if (!session) {
        redirect(redirectTo);
        return;
      }

      if (
        allowedRoles.length > 0 &&
        session.user?.role &&
        !allowedRoles.includes(session.user.role)
      ) {
        redirect("/unauthorized");
        return;
      }

      setIsChecking(false);
    }, [session, status, redirectTo, allowedRoles]);

    if (status === "loading" || isChecking) {
      return <Loading />;
    }

    if (!session) {
      return null;
    }

    return <Component {...props} />;
  };
} 