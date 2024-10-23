"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import AlertErrorIcon from "../../components/icons/alert-error";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const Page = () => {
  const route = useRouter();

  const handleSubmit = () => {
    route.push("/document-preparation/v1");
  };

  return (
    <div className={`${styles.page} flex`}>
      <div className="bg-white h-[90%] w-[70%] m-auto rounded-2xl p-16 flex flex-col">
        <div>
          <Image
            src="/assets/images/23-logo.png"
            width={214}
            height={99}
            alt="23 Logo"
          />
        </div>
        <div className="border-4 border-primary rounded my-6"></div>
        <div className="text-xl">Documents Preparation</div>
        <div className="text-negative flex gap-2 text-sm mt-1">
          <AlertErrorIcon />{" "}
          <span>Before proceeding, please prepare the documents below</span>
        </div>

        <div className="grow mt-7 p-3 text-sm">
          <div className="font-bold">
            Before proceeding to complete the profile, please prepare the
            documents or photos below:
          </div>
          <div className="px-7 py-2">
            <ul className="list-disc">
              <li>
                <span className="font-bold">Self Photo</span>
              </li>
              <li>
                <span className="font-bold">Identity Card</span> (KTP - Kartu
                Tanda Penduduk)
              </li>
              <li>
                <span className="font-bold">Faimily Card</span> (KK - Kartu
                Keluarga)
              </li>
              <li>
                <span className="font-bold">Tax Card</span> (NPWP - Nomor Pokok
                Wajib Pajak)
              </li>
              <li>
                <span className="font-bold">Kartu BPJS Kesehatan Pribadi</span>
              </li>
              <li>
                <span className="font-bold">
                  Kartu BPJS Ketenagakerjaan Pribadi
                </span>
              </li>
              <li>
                <span className="font-bold">
                  Kartu BPJS Kesehatan Istri dan Anak
                </span>{" "}
                (jika ada)
              </li>
              <li>
                <span className="font-bold">
                  Education Certificate & Transcripts
                </span>
              </li>
              <li>
                <span className="font-bold">
                  Verklaring / Parklaring Letter
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-auto">
          <div className="font-bold text-negative text-sm">{`The data you've entered can be temporarily saved, and you can continue to complete it at a later time.`}</div>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => handleSubmit()}
            className="w-full mt-4"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Page;
