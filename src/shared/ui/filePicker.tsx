import React, { useImperativeHandle, useRef, useState } from "react";
import { FaUpload, FaRegFileImage, FaRegFile } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { Dialog } from "./dialog";
import { useController } from "react-hook-form";
import clsx from "clsx";
import { ErrorField } from "./errorField";

export const FilePicker = ({
  name,
  multiple = false,
  isEditMode = false,
}: {
  name: string;
  multiple?: boolean;
  isEditMode?: boolean;
}) => {
  const {
    field: { onChange, ref, value },
  } = useController({
    name,
  });

  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>(
    isEditMode ? (multiple ? [...value] : [value]) : [],
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const onDelete = (indexImg: number) => {
    const updatedList = files.filter((_, index) => index !== indexImg);
    onChange(updatedList);
    setFiles(updatedList);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      if (multiple) {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        onChange((prevFiles: File[]) => [...prevFiles, ...newFiles]);
      } else {
        setFiles(newFiles);
        onChange(newFiles[0]);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);

    if (droppedFiles.length === 0) {
      throw new Error("No files found");
    }

    if (multiple) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      onChange((prevFiles: File[]) => [...prevFiles, ...droppedFiles]);
    } else {
      setFiles(droppedFiles.slice(0, 1));
      onChange(droppedFiles[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      e.relatedTarget &&
      (e.currentTarget as Node).contains(e.relatedTarget as Node)
    ) {
      return;
    }

    setDragging(false);
  };

  useImperativeHandle(ref, () => {
    let initialized = false;
    return {
      focus: () => {
        if (fileRef.current && !initialized) {
          initialized = true;
          fileRef.current.click();
        }
      },
    };
  }, []);

  return (
    <>
      <div
        className={clsx(
          "flex w-full items-center justify-center mx-auto text-center border-2 rounded-md mt-4 py-5",
          {
            "border border-[#2B92EC] bg-[#EDF2FF]": dragging,
            "border-dashed border-[#e0e0e0]": !dragging,
          },
        )}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <div className="flex-1 flex flex-col">
          <div className="mx-auto text-gray-400 mb-2">
            <FaUpload size={18} />
          </div>
          <div className="text-[12px] font-normal text-gray-500">
            <input
              className="opacity-0 hidden"
              type="file"
              multiple={multiple}
              accept=".jpg"
              ref={fileRef}
              onChange={handleChange}
            />
            <span
              className="text-[#4070f4] cursor-pointer"
              onClick={() => fileRef.current?.click()}
            >
              Click to upload
            </span>
            or drag and drop
          </div>
          <div className="text-[10px] font-normal text-gray-500">
            Only JPG files are allowed
          </div>
        </div>
      </div>

      <ErrorField name={name} />

      {files.length > 0 && (
        <div className="mt-4">
          {files.map((img, index) => (
            <div
              key={index}
              className="px-3 py-3.5 rounded-md bg-slate-200 space-y-3"
            >
              <Dialog
                open={dialogIsOpen}
                onClose={() => setDialogIsOpen(false)}
              >
                {img.type.match(/image.*/i) && (
                  <img src={URL.createObjectURL(img)} width="500px" />
                )}
              </Dialog>
              <div className="flex">
                <div className="flex items-center space-x-2">
                  <div
                    className="text-[#5E62FF] text-[37px] cursor-pointer"
                    onClick={() => setDialogIsOpen(true)}
                  >
                    {img.type.match(/image.*/i) ? (
                      <FaRegFileImage />
                    ) : (
                      <FaRegFile />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="max-w-20 truncate text-xs font-medium text-gray-500">
                      {img.name}
                    </p>
                    <p className="text-[10px] font-medium text-gray-400">{`${Math.floor(
                      img.size / 1024,
                    )} KB`}</p>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="space-y-1">
                    <div
                      className="text-gray-500 text-[17px] cursor-pointer"
                      onClick={() => onDelete(index)}
                    >
                      <BsX className="ml-auto" />
                    </div>
                    <div className="text-[10px] font-medium text-gray-400">
                      Done
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
