import { ComponentType, useEffect } from "react";

const withAuth = <P extends {}>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/"; // Redirect to login
          return;
        }

        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );

          const decodedToken: { id: number } = JSON.parse(jsonPayload);
          const userId = decodedToken.id;
          console.log("User ID:", userId);
          // You can now use userId as needed
        } catch (error) {
          console.error("Error parsing token:", error);
          window.location.href = "/"; // Redirect to login
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
