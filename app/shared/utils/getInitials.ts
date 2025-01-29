import { capitalizeWords } from "./capitalizeWords";

export const getInitials = (fullName: string) => {
  if (typeof fullName === "string" && fullName.trim() !== "") {
    const [firstName, lastName] = capitalizeWords(fullName).trim().split(" ");
    return `${firstName ? firstName.charAt(0).toUpperCase() : ""}${lastName ? lastName.charAt(0).toUpperCase() : ""}`;
  } else {
    return null;
  }
};
