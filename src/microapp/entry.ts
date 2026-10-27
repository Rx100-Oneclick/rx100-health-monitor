import { createElement } from "react";
import { defineXOOSMicroapp, useXOOS } from "@xoos/microapp-adapter";
import styles from "@/styles/index.css?inline";
import App from "@/app/App";
import { BridgeProvider } from "./runtime";
import { microappConfig } from "../../microapp.config";

function WorkflowHealthMonitorAdapterRoot(props: Record<string, unknown>) {
  const bridge = useXOOS();

  return createElement(BridgeProvider, {
    bridge,
    props,
    children: createElement(App),
  });
}

defineXOOSMicroapp({
  id: microappConfig.microappKey,
  element: microappConfig.elementName,
  App: WorkflowHealthMonitorAdapterRoot,
  styles,
  shadowDom: true,
});

export { microappConfig };
export default WorkflowHealthMonitorAdapterRoot;
