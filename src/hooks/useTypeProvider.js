import { TypeContext } from "@/providers/TypeProvider";
import { useContext } from "react";

export default function useTypeProvider() {
    return useContext(TypeContext);
}