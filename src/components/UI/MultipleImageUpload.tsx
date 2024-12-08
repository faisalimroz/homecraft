import React, { useRef } from 'react';
import Image from 'next/image';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { TiDeleteOutline } from 'react-icons/ti';

interface ServiceImage {
  id: number;
  url: string;
}

interface ImageUploadProps {
  images: ServiceImage[];
  setImages: React.Dispatch<React.SetStateAction<ServiceImage[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  error: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, setImages, setError, error }) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newPreviews: string[] = [];
    const newImages: ServiceImage[] = [];

    const readFiles = fileArray.map(file => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            const result = reader.result as string;
            const newImage = { id: Date.now(), url: result };

            newImages.push(newImage);
            newPreviews.push(result);
            resolve();
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readFiles)
      .then(() => {
        setImages(prevImgs => [...prevImgs, ...newImages]);
        setError(null); // Reset any image error on successful upload
      })
      .catch(error => {
        console.error("Error reading files: ", error);
        setError("An error occurred while uploading images.");
      });
  };

  const handleRemoveImage = (id: number) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full rounded-md mb-8">
      <span className="font-medium text-black text-sm">Upload Service Images</span>
      <button
        className="w-full rounded-lg text-3xl lg:text-4xl flex items-center justify-center text-gray-500 py-12 border border-dashed border-gray-300 hover:text-[#1475c6] hover:border-[#1475c6] transition ease-in duration-300"
        onClick={handleClick}
        type="button"
      >
        <IoCloudUploadOutline />
        <span className="ml-2 text-sm">Upload Images</span>
      </button>

      <input
        type="file"
        multiple
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none' }}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {images.length > 0 && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <Image
                src={img.url}
                alt={`Service Image ${index + 1}`}
                height={80}
                width={80}
                className="rounded-md  shadow-md h-[80px] w-[80px]"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(img.id)}
                className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition ease-in duration-200"
              >
                <TiDeleteOutline size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < 4 && (
        <p className="text-sm text-gray-500 mt-2">Please select at least 4 images.</p>
      )}
    </div>
  );
};

export default ImageUpload;
