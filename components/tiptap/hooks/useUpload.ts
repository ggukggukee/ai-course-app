import API from "../lib/api";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);

  const uploadFile = useCallback(async (file: File, fileData: ArrayBuffer) => {
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Файл слишком большой. Максимальный размер файла 15 МБ");
      return;
    }

    setLoading(true);
    setPercent(0);
    try {
      const url = await API.uploadImage(file, fileData, setPercent);
      setLoading(false);
      return url;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (errPayload: any) {
      const error =
        errPayload?.response?.data?.error || "Ошибка загрузки изображения";
      toast.error(error);
    }
    setLoading(false);
  }, []);

  return { loading, percent, uploadFile };
};
