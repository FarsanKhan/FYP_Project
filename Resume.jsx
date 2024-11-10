import React, { useRef } from "react";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { Button } from "../ui/button";
import FilePreview from "../ui/FilePreview";

const Resume = ({ preview, file, setFile, onEdit, fileErr, setFileErr }) => {
  const ref = useRef();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <TypographyP className="text-base">
          <b>Resume</b>
        </TypographyP>
        {preview && (
          <Button onClick={onEdit} variant="ghost" className="text-blue-500">
            Edit
          </Button>
        )}
      </div>
      <TypographyP className="text-sm">
        Be sure to include an updated resume *
      </TypographyP>
      {file && <FilePreview file={file} />}
      {!preview && (
        <>
          <Button
            onClick={() => ref.current.click()}
            size="sm"
            variant="outline"
            className="relative h-9 w-fit text-blue-500 border-blue-500 rounded-full"
          >
            <input
              name="file"
              required
              ref={ref}
              onChange={(e) => {
                setFileErr(false);
                setFile(e.target.files[0]);
              }}
              type="file"
              multiple={false}
              accept=".pdf,.doc,.docx"
              className="invisible absolute h-full w-full"
            />
            Upload resume
          </Button>
          <TypographyMuted className="text-xs ml-1">
            DOC, DOCX, PDF (2 MB)
          </TypographyMuted>
          {fileErr && (
            <TypographyP className="text-xs text-red-600">
              Resume is required!
            </TypographyP>
          )}
        </>
      )}
    </div>
  );
};

export default Resume;
