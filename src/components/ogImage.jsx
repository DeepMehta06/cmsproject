import { storage } from "@/static/firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useState } from "react";

export default function ImageUpload({returnImage}) {
    const [imageUrl, setImageUrl] = useState();
    const [imageFile, setImageFile] = useState();
    const [loading, setLoading] = useState(false);
    let image;
    const handleImageFile = async(e) => {
        image = e.target.files[0];
        setImageFile(image);
        if(image){
            uploadToFireBase(image);
        }
    }

    const uploadToFireBase = async () => {
        setLoading(true);
        console.log(loading)
        const storageRef = ref(storage, `images/${image.name}`);
        try{
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);
            returnImage(url);
            console.log("fireBase chal raha h")
        }catch (error) {
            console.log(error.message);
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col gap-5">
            <label className="cursor-pointer">
                <span className="bg-gray-400/20 border border-dashed border-gray-200 px-3 py-3 mx-10 rounded-md">
                    Upload cover Image
                </span>
                <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
            </label>
            <div className="px-3 py-2 mx-8">
                {
                    loading && <button disabled > Uploading... </button>
                }
                {
                    imageUrl && (
                        <div className="flex flex-col gap-2">
                        <h3>Image Uploaded Successfully</h3>
                        <img className="border border-gray-400 rounded-md w-[300px] h-[200px]" src={imageUrl} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
