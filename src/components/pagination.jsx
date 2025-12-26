"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button";

export default function Pagination({perPage, currentPage, totalItems, ...props}){
    const router = useRouter();
    const totalPages = Math.ceil(totalItems/perPage);
    return <div {...props} className="flex flex-row justify-center ">
        <div className="flex gap-3">
            <Button>
                Prev
            </Button>
            {
                Array.from({ lenght : totalPages}, (_, index)=> {
                    return <button>{index+1}</button>
                })
            }
            <Button>
                Next
            </Button>
        </div>
    </div>
}