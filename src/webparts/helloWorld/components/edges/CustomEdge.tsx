import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useReactFlow,
  type EdgeProps,
} from "@xyflow/react";

export type GetSpecialPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

// const getSpecialPath = (
//   { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams,
//   offset: number
// ) => {
//   const centerX = (sourceX + targetX) / 2;
//   const centerY = (sourceY + targetY) / 2;

//   return `M ${sourceX} ${sourceY} Q ${centerX} ${
//     centerY + offset
//   } ${targetX} ${targetY}`;
// };

export default ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps): ReturnType<React.FC> => {
  const { setEdges } = useReactFlow();

  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };
  const [path, labelX, labelY] = getSmoothStepPath(edgePathParams);

  const onEdgeClick = (): void => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={path} markerEnd={markerEnd} type="smoothstep" />
      <EdgeLabelRenderer>
        <div
          className="button-edge__label nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button className="button-edge__button" onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
