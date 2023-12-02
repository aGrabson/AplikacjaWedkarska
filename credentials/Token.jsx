import jwtDecode from "jwt-decode";

export const getRoleFromToken = async (token) => {
  const rawDecodedToken = jwtDecode(token);
  return rawDecodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
};
