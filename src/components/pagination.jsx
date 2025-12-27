"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button";

export default function Pagination({perPage, currentPage, totalItems, ...props}){
    const router = useRouter();
    const totalPages = Math.ceil(totalItems/perPage);
    const handlePageChange = (pageIndex) => {
        if(pageIndex < 1 || pageIndex > Math.ceil(totalItems/perPage)) return;
        router.push(`?page=${pageIndex}`);
    } 
    return <div {...props} className="flex flex-row justify-center ">
        <div className="flex gap-3">
            <Button
                onClick={()=> handlePageChange(parseInt(currentPage)-1)}
                className={`${currentPage == 1 ? "text-gray-400 cursor-not-allowed": ""}`}>
                Prev
            </Button>
            {
                Array.from({ length : totalPages}, (_, index)=> {
                    return <button>{index+1}</button>
                })
            }
            <Button
                onClick={()=> handlePageChange(parseInt(currentPage)+1)}
                className={`${currentPage===Math.ceil(totalItems/perPage) ? "text-gray-400 cursor-not-allowed": ""}`}>
                Next
            </Button>
        </div>
    </div>
}