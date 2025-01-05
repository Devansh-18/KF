import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';

const Upload = ({
  label, name, errors, setValue, register,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const [previewSrc, setPreviewSrc] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor={name} className="text-sm font-medium text-gray-900">
        {label} <sup className="text-red-600">*</sup>
      </label>

      <div
        className={`${
          isDragActive ? "bg-gray-100" : "bg-gray-200"
        } flex min-h-[250px] items-center justify-center rounded-lg border-4 border-dashed border-gray-400 shadow-md transition duration-300 ease-in-out hover:shadow-xl`}
        {...getRootProps()}
      >
        {previewSrc ? (
          <div className="flex flex-col items-center space-y-3 p-6">
            <img src={previewSrc} alt="Preview" className="h-full w-full rounded-md object-cover shadow-lg" />
            <button
              className="text-sm text-blue-600 underline"
              type="button"
              disabled={viewData ? true : false}
              onClick={() => {
                setSelectedFile(null);
                setPreviewSrc("");
                setValue(name, null);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3 p-6">
            <input {...getInputProps()} ref={inputRef} />
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full text-white">
              <FiUploadCloud className="text-3xl" />
            </div>
            <p className="text-center text-sm text-gray-800">
              Drag & drop an image or <span className="font-semibold text-yellow-500">Browse</span> to select
            </p>
            <ul className="mt-4 flex list-disc justify-between space-x-12 text-xs text-gray-900">
              <li>Aspect Ratio: 16:9</li>
              <li>Recommended Size: 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs text-pink-500">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Upload;
