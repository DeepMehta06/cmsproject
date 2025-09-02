import { Edit } from "lucide-react";
import * as ReactHookForm from "react-hook-form";
import { useForm } from "react-hook-form";

export default function Editor() {
    const { register } = useForm();
    return (
        <section>
            <Edit />
            <form>
                <input type="text" />
            </form>
        </section>
    )
}