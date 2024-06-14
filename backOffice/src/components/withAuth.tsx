import { ComponentType, useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = <P extends {}>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    useEffect(() => {
      if (typeof window !== "undefined") {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (!isAuthenticated) {
          window.location.href = "/login"; // Redirect to /login
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
