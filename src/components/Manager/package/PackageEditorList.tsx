import React from "react";
import UiEditor from "../../common/UiEditor";

interface PackageEditorProps {
  title: string;
  setHotelInfoMd: React.Dispatch<React.SetStateAction<string>>;
  setRegionInfoMd: React.Dispatch<React.SetStateAction<string>>;
  setTermsMd: React.Dispatch<React.SetStateAction<string>>;
  setHotelInfoHtml: React.Dispatch<React.SetStateAction<string>>;
  setRegionInfoHtml: React.Dispatch<React.SetStateAction<string>>;
  setTermsHtml: React.Dispatch<React.SetStateAction<string>>;
  hotelInfo?: string;
  regionInfo?: string;
  terms?: string;
}

const PackageEditorList = ({
  title,
  setHotelInfoMd,
  setRegionInfoMd,
  setTermsMd,
  setHotelInfoHtml,
  setRegionInfoHtml,
  setTermsHtml,
  hotelInfo,
  regionInfo,
  terms,
}: PackageEditorProps) => {
  const handleEditorChange = (htmlContent: string, markdownContent: string) => {
    if (title === "호텔안내") {
      setHotelInfoHtml(htmlContent);
      setHotelInfoMd(markdownContent);
    } else if (title === "지역정보") {
      setRegionInfoHtml(htmlContent);
      setRegionInfoMd(markdownContent);
    } else if (title === "여행약관") {
      setTermsHtml(htmlContent);
      setTermsMd(markdownContent);
    }
  };
  return (
    <div className="w-full flex mb-10">
      <h2 className="font-bold text-xl mb-4 whitespace-nowrap mr-20">
        {title}
      </h2>
      <div className="flex w-full">
        <div className="flex flex-col w-full">
          <UiEditor
            title={title}
            onChange={handleEditorChange}
            initialValue={
              title === "호텔안내"
                ? hotelInfo
                : title === "지역정보"
                ? regionInfo
                : title === "여행약관"
                ? terms
                : ""
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PackageEditorList;
