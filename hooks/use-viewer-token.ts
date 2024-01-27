import { createViewerToken } from "@/actions/token";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { jwtDecode, JwtPayload } from "jwt-decode";

export default function useViewerToken(hostIdentity: string) {
  const [token, setToken] = useState("");
  const [identity, setIdentity] = useState("");
  const [name, setName] = useState("");

  const generateToken = async (hostIdentity: string) => {
    try {
      const viewerToken = await createViewerToken(hostIdentity);
      setToken(viewerToken);
      const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
        name?: string;
      };
      const name = decodedToken?.name;
      const identity = decodedToken.jti;
      if (identity) {
        setIdentity(identity);
      }
      if (name) {
        setName(name);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    generateToken(hostIdentity);
  }, [hostIdentity]);

  return { token, identity, name };
}
