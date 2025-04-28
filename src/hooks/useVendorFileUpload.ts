import { useState } from "react";

export function useVendorFileUpload() {
  const [logo_url, setLogoUrl] = useState(null);
  const [dok_pendukung_url, setDokPendukungUrl] = useState(null);
  const [logoUploadState, setLogoUploadState] = useState("default");
  const [dokPendukungUploadState, setDokPendukungUploadState] = useState("default");

  const handleLogoFileSelect = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setLogoUploadState("processing");
    setTimeout(() => {
      setLogoUploadState("done");
    }, 1000);
  };

  const handleDokPendukungFileSelect = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setDokPendukungUploadState("processing");
    setTimeout(() => {
      setDokPendukungUploadState("done");
    }, 1000);
  };

  const handleLogoCancel = () => {
    setLogoUrl(null);
    setLogoUploadState("default");
  };

  const handleDokPendukungCancel = () => {
    setDokPendukungUrl(null);
    setDokPendukungUploadState("default");
  };

  return {
    logo_url,
    setLogoUrl,
    dok_pendukung_url,
    setDokPendukungUrl,
    logoUploadState,
    dokPendukungUploadState,
    handleLogoFileSelect,
    handleDokPendukungFileSelect,
    handleLogoCancel,
    handleDokPendukungCancel,
  };
}
