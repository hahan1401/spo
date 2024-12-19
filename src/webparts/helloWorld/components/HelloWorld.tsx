import React from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  type OnConnect,
} from "@xyflow/react";
import { useCallback } from "react";
import styles from "./styles.module.scss";

import "@xyflow/react/dist/style.css";

import { edgeTypes, initialEdges } from "./edges";
import { initialNodes, nodeTypes } from "./nodes";
import { IHelloWorldProps } from "./IHelloWorldProps";
const HelloWorld: React.FC<IHelloWorldProps> = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    <>
      <div className={styles["reactFlow-Wrapper"]}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={(e) => {
            console.log("node", e);
            onNodesChange(e);
          }}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={(e) => {
            console.log("edge", e);
            onEdgesChange(e);
          }}
          onConnect={(e) => {
            console.log("connect", e);
            onConnect(e);
          }}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default HelloWorld;
