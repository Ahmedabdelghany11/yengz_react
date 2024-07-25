import React from "react";
import SectionHeader from "../ui/SectionHeader";
import NewsLetter from "../ui/NewsLetter";
import useGetSettings from "../features/settings/useGetSettings";

const Terms = () => {
  const { data: settings } = useGetSettings();
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };
  return (
    <>
      <SectionHeader />
      <section className="faqs">
        <div className="container">
          <div
            dangerouslySetInnerHTML={renderHTML(settings?.data?.terms)}
          ></div>
        </div>
      </section>
      <NewsLetter />
    </>
  );
};

export default Terms;
