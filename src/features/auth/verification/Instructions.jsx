import React from "react";
import useGetSettings from "../../settings/useGetSettings";
import { useTranslation } from "react-i18next";
import DataLoader from "../../../ui/DataLoader";

const Instructions = ({ setStep }) => {
  const { t } = useTranslation();
  const { data: settings, isLoading } = useGetSettings();
  return (
    <div className="instructions form">
      {isLoading ? (
        <DataLoader />
      ) : (
        <p>{settings?.data?.verification_description}</p>
      )}
      <div className="d-flex justify-content-end w-100">
        <button
          onClick={() => setStep(2)}
          className={`w-25 mt-4 align-self-end `}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default Instructions;
