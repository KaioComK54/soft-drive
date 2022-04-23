import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";

import useFile from "validations/useFile";
import useError from "validations/useError";

interface Props {
  open: boolean;
  close: any;
  reference: any;
  fileId: string;
}

const Options = ({ open, close, reference, fileId }: Props) => {
  const { handleDownload, handleDelete } = useFile();
  const { validateError } = useError();

  const download = async () => await handleDownload(fileId);

  const deleteFile = async () => {
    try {
      await handleDelete(fileId);
    } catch (error: any) {
      validateError(error);
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={reference}
      onClose={close}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <MenuItem onClick={download}>Download</MenuItem>
      <MenuItem onClick={deleteFile}>Apagar</MenuItem>
    </Popover>
  );
};

export default Options;
