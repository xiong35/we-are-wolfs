import "./index.less";
import { FC } from "react";
import { UseMenu } from "../UseMenu";
import {
  currentContent,
  dialogTimeLeft,
  hideDialog,
} from "../../signals/dialog";

export const Dialog: FC = () => {
  if (dialogTimeLeft.value <= 0) return null;

  return (
    <UseMenu className={"w-dialog"} onCancel={hideDialog}>
      <div className="w-dialog-content">
        <span
          className="w-dialog-content-text"
          dangerouslySetInnerHTML={{
            __html: currentContent.value?.content ?? "",
          }}
        ></span>
        <div onClick={hideDialog} className="confirm">
          确认({dialogTimeLeft.value} s)
        </div>
      </div>
    </UseMenu>
  );
};

// <template>
//   <UseMenu
//     v-show="dialogTimeLeft > 0"
//     :onCancel="() => (dialogTimeLeft = 0)"
//   >
//     <div class="dialog-content">
//       <span
//         class="content"
//         v-html="content && content.content"
//       ></span>
//       <div @click="dialogTimeLeft = 0" class="confirm">
//         确认({{ dialogTimeLeft }}s)
//       </div>
//     </div>
//   </UseMenu>
// </template>

// <script lang="ts">
//   import { defineComponent, watch, watchEffect } from "vue";

//   import {
//     content,
//     dialogTimeLeft,
//     showDialog,
//     toShowContents,
//   } from "../reactivity/dialog";

//   import UseMenu from "./UseMenu.vue";

//   const Dialog = defineComponent({
//     name: "Dialog",
//     components: { UseMenu },
//     setup(props) {
//       var timer: number;

//       watch(content, () => {
//         if (content.value === null) {
//           clearInterval(timer);
//           dialogTimeLeft.value = -1;
//         } else {
//           dialogTimeLeft.value = content.value.timeout;
//           timer = window.setInterval(() => {
//             dialogTimeLeft.value--;
//             if (dialogTimeLeft.value <= 0) {
//               clearInterval(timer);
//               dialogTimeLeft.value = -1;
//               toShowContents.value.shift();
//             }
//           }, 1000);
//         }
//       });

//       return { dialogTimeLeft, content };
//     },
//   });

//   export default Dialog;
// </script>

// <style lang="scss" scoped>
//   .dialog-content {
//     min-height: 8rem;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     align-items: center;
//     word-break: break-word;
//     padding: 1.5rem 0 0rem;
//     .confirm {
//       margin-top: 1rem;
//       padding: 0.5rem;
//       cursor: pointer;
//     }
//   }
// </style>
