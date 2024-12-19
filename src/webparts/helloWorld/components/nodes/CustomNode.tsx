import { type NodeProps } from "@xyflow/react";
import React from 'react';

import { type CustomNode as TCustomNode } from "./types";

export const CustomNode = ({ data, id }: NodeProps<TCustomNode>) => {
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

      {/* <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} /> */}
    </div>
  );
}
