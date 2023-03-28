import { FC } from "react";
import { Btn, IBtnProps } from "../../../../components/Btn";
import { noTarget, setIsActing, target } from "../../../../signals/actions";

export type IActionsBtnProps = IBtnProps & {
  noTarget: boolean;
  closeActions: () => void;
};

export const ActionsBtn: FC<IActionsBtnProps> = ({
  noTarget: _noTarget,
  closeActions,
  onClick: _onClick,
  ...props
}) => {
  const onClick = () => {
    if (!props.disabled) {
      commonAction();
    }
    return _onClick?.();
  };

  function commonAction() {
    closeActions();
    setIsActing(true);
    target.value = -1;
    noTarget.value = _noTarget;
  }

  return <Btn {...props} onClick={onClick} />;
};
