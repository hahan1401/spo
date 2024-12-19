import React from "react";
import * as RF from "@xyflow/react";

import { type CustomNode as TCustomNode } from "./types";
import { ModalBasicExample } from "../Modal/ModalBasicExample";

const Handle = (props: RF.HandleProps) => <RF.Handle {...props} />;

export function CustomNode({ data, id }: RF.NodeProps<TCustomNode>) {
  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && (
        <div
          onClick={() => {
            data.onClick?.(id);
          }}
        >
          {data.label}
        </div>
      )}
      <ModalBasicExample />

      <Handle type="target" position={RF.Position.Top} id={`-top_${id}`} />
      <Handle type="source" position={RF.Position.Right} id={`-right_${id}`} />
      <Handle type="source" position={RF.Position.Bottom} id={`-bottom_${id}`} />
      <Handle type="target" position={RF.Position.Left} id={`-left_${id}`} />
    </div>
  );
}
