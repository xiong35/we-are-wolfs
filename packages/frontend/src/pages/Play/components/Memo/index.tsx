import styles from "./index.module.less";
import { FC } from "react";
import { UseMenu } from "../../../../components/UseMenu";
import { useLocalStorage } from "../../../../utils/useLocalStorage";
import { StoragePrefix } from "@werewolf/shared";

export type IMemoProps = {
  close: () => void;
};

export const Memo: FC<IMemoProps> = ({ close }) => {
  const [val, setVal] = useLocalStorage("", `${StoragePrefix}memo`);

  return (
    <UseMenu className={styles["w-memo"]} v-show="showMemo" onCancel={close}>
      <span className={styles["title"]}>备忘录</span>
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        rows={20}
      ></textarea>
    </UseMenu>
  );
};
