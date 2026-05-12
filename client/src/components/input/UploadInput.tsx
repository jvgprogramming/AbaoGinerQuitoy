import { useCallback, useEffect, useState, type FC } from "react"
import { useDropzone } from "react-dropzone"
import RemoveButton from "../Button/RemoveButton"

interface UploadInputProps {
  label: string
  name: string
  value?: File | null
  onChange?: (file: File | null) => void
  onRemoveExistingImageUrl?: () => void
  existingImageUrl?: string | null
  errors?: string[]

}

const UploadInput: FC<UploadInputProps> = ({
    label,
    name,
    value,
    onChange,
    onRemoveExistingImageUrl,
    existingImageUrl,
    errors
}) => {

    const [preview,setPreview] = useState<string | null>(null)
    const onDrop = useCallback((acceptedFiles: File[]) => {

            if(acceptedFiles && acceptedFiles.length > 0) {
                const file = acceptedFiles[0]
                setPreview(URL.createObjectURL(file));
                
                if(onChange) onChange(file);
            }

        }, [onChange]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: { 'image/png': [], 'image/jpeg': [], 'image/jpg': [] }, multiple: false});

    useEffect(() => {
        if(value){
            setPreview(URL.createObjectURL(value))
        }else if(existingImageUrl){
            setPreview(existingImageUrl)
        }else{
            setPreview(null)
        }

    }, [value, existingImageUrl]);

    return (
    <>
    <div className="mb-1">
        <label htmlFor={name} className="text to-blue-600">
            {label}
        </label>
    </div>   
     <div className={`transition border border-gray-300 border-dashed cursor-pointer rounded-lg hover:border-blue-900 ${errors ? 'mb-0' : 'mb-4'}`}>

        <div {...getRootProps()} className={`border-gray-300 border-dashed  rounded-lg p-7 lg:p-10 ${isDragActive ? 'border-blue-900 bg-gray-100' : 'border-gray-300 bg-amber-50'}`}
        >
            <input {...getInputProps()} name={name} id={name} />  
            
            <div className="flex flex-col items-center m-0">
                {preview ? (<img src={preview} alt="Profile Picture Preview" className="object-cover rounded-full w-[185px] h-[185px]" />) : (
                    <>
                        <div className="mb-[22px] flex justify-center">
                            <div className="flex items-center w-[68px] h-[68px] bg-gray-200 rounded-full text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 16.5v2.25M9.75 16.5v2.25M13.5 16.5v2.25M6 19.5a3 3 0 003 3h6a3 3 0 003-3m-18 0a3 3 0 013-3h6a3 3 0 013 3m-18 0v-2.25A3 3 0 016.75 14.25h10.5A3 3 0 0120 17.25V19.5" />
                                </svg>  

                            </div>

                        </div>

                        <h4 className="mb-3 font-semibold text-gray-800 text-xl">
                            {isDragActive ? "Drop the image here..." : "Drag and drop an image here, or click to select an image"}
                        </h4>
                        <span className="text-center mb-4 block w-full max-w-[290px] text-sm text-gray-700">
                            Supported formats: .jpg, .jpeg, .png. Max file size: 5MB.
                        </span>
                        <span className="font-medium underline text-blue-600 text-sm">
                            Browse Files
                        </span>
                </>
            
            )}
            </div>

        </div>

     </div>
            {errors && errors.length > 0 && (
                <div className="mb-2">
                   <span className="text-red-600 text-sm">{errors[0]}</span>
                </div>
            )}

            {preview && (
                <RemoveButton label="Remove Profile Picture"  className="w-full" onRemove={() => {
                    if(onChange) onChange(null);
                    if(onRemoveExistingImageUrl) onRemoveExistingImageUrl();
                    setPreview(null);
                }} />
            )}
    </> 
  )
}

export default UploadInput