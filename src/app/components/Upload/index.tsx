import { Button, Col, Row, Upload, message } from "antd";
import { useEffect, useState } from "react";

interface UploadFileProps {
  allowedFile: string[];
  maxSize: number;
  recommendedSize?: string;
  onFileUpload?: (file: File) => void;
  onFileDeleted?: (file?: File) => void;
  disabled?: boolean;
}
const UploadFile = (props: UploadFileProps) => {
  const { allowedFile, maxSize, recommendedSize, onFileUpload, onFileDeleted } =
    props;

  const [acceptedFile, setAcceptedFile] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    let accepted: string[] = [];
    allowedFile.forEach((filetype) => {
      if (filetype === "JPG") {
        accepted.push("image/jpeg");
      }

      if (filetype === "PNG") {
        accepted.push("image/png");
      }

      if (filetype === "PDF") {
        accepted.push("application/pdf");
      }
    });
    setAcceptedFile(accepted.join(","));
  }, [allowedFile]);

  const checkingData = (file: any) => {
    if (file.size > maxSize * 1024) {
      message.error("File is too large");
      return false;
    }
    if (onFileUpload) {
      onFileUpload(file);
    }
    setFileList([file]);
  };

  const handleDelete = (file: any) => {
    const updatedFileList = fileList.filter((item) => item !== file);
    setFileList(updatedFileList);
    if (onFileDeleted) {
      onFileDeleted(file);
    }
  };

  return (
    <div>
      <Row align="middle" gutter={24}>
        <Col>
          <Upload
            accept={acceptedFile}
            beforeUpload={checkingData}
            maxCount={1}
            fileList={fileList}
            onRemove={handleDelete}
            disabled={props.disabled}
          >
            <Button className="px-24">Upload File</Button>
          </Upload>
        </Col>
        <Col>
          <div>File : {allowedFile.join("/")}</div>
          <div>Max Size : {maxSize / 1024}MB</div>
          {recommendedSize && <div>Recommended Size : {recommendedSize}</div>}
        </Col>
      </Row>
    </div>
  );
};
export default UploadFile;
