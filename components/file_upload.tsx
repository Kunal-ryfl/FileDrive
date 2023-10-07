import axios from "axios";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload = ({ folderId }: { folderId: string }) => {
  return (
    <UploadDropzone
      endpoint="messageFile"
      // onClientUploadComplete={(res) => {
      //   onChange(res?.[0].url);
      // }}
      onClientUploadComplete={(res: any) => {
        // Do something with the response

        async function onUpload() {
          const loadingToast = toast.loading("uploading...", {});
          try {
            await axios.post("/api/newFile", {
              folderId,
              name: res[0].name,
              link: `https://utfs.io/f/${res[0].fileKey}`,
            });
            toast.success("upload success", {
              id: loadingToast,
              position: "bottom-right",
            });
          } catch (error) {
            toast.error("error", {
              id: loadingToast,
              position: "bottom-right",
            });
            console.log(error, { id: loadingToast });
          }
        }

        onUpload();

        // console.log("Files: ", res);

        // alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
