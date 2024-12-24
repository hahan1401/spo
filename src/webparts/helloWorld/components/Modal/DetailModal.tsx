import { ColorPicker, Dropdown, IColorPickerStyles, Modal, PrimaryButton } from '@fluentui/react';
import { useReactFlow } from '@xyflow/react';
import { useState } from 'react';
import {
	DEFAULT_POSITION_X,
	DEFAULT_POSITION_Y,
	HORIZONTAL_NODE_GAP,
	NODE_GROUP_MIN_HEIGHT,
	NODE_GROUP_NODE_ITEM_DIFF_HEIGHT,
	NODE_MIN_HEIGHT,
	NODE_MIN_WIDTH,
	NODE_SHAPES,
	VERTICAL_NODE_GAP,
} from '../../../../Constants';
import { NODE_TYPE } from '../../../../types/common';
import { capitalizeFirstLetter, hashString } from '../../../../Utils';
import { AppNode, CustomNode, NodeShapeType } from '../nodes/types';

const NODE_SHAPE_OPTIONS = [
	{ key: NODE_SHAPES.circle, text: capitalizeFirstLetter(NODE_SHAPES.circle) },
	{ key: NODE_SHAPES.ellipse, text: capitalizeFirstLetter(NODE_SHAPES.ellipse) },
	{ key: NODE_SHAPES.penagon, text: capitalizeFirstLetter(NODE_SHAPES.penagon) },
	{ key: NODE_SHAPES.rhombus, text: capitalizeFirstLetter(NODE_SHAPES.rhombus) },
	{ key: NODE_SHAPES.trapezoid, text: capitalizeFirstLetter(NODE_SHAPES.trapezoid) },
];

const colorPickerStyles: Partial<IColorPickerStyles> = {
	panel: { padding: 12 },
	root: {
		maxWidth: 200,
		minWidth: 200,
	},
	colorRectangle: { height: 100 },
};

const getNodeGroupOptions = (nodes: AppNode[]) =>
	nodes
		.filter((item) => item.type === NODE_TYPE.LABELED_GROUP)
		.map((item) => ({ key: item.id, text: item.data.label }));

const DetailModal = ({
	node,
	hideModal,
	isModalOpen,
}: {
	node?: AppNode;
	isModalOpen?: boolean;
	hideModal?: () => void;
}) => {
	const isLabeledNode = node?.type === 'labeled-group';
	const { getNodes, addNodes, updateNode, deleteElements, getNode } = useReactFlow<AppNode>();
	const [nodeName, setNodeName] = useState(node?.data.label ?? '');
	const [nodeGroup, setNodeGroup] = useState(node?.parentId);
	const [nodeShape, setNodeShape] = useState<NodeShapeType>((node as CustomNode)?.data?.shape as NodeShapeType);
	const [backgroundColor, setBackgroundColor] = useState(node?.style?.backgroundColor ?? '#fff');
	const [textColor, setTextColor] = useState(node?.style?.color ?? '#000');
	const addNode = () => {
		let nodesInGroup = getNodes().filter((item) => item.parentId === nodeGroup);

		const positionX = nodeGroup
			? nodesInGroup.reduce((prevValue, current) => {
					return prevValue + (current.measured?.width ?? 0) + HORIZONTAL_NODE_GAP;
				}, HORIZONTAL_NODE_GAP)
			: DEFAULT_POSITION_X;

		const postionY = nodeGroup
			? (NODE_GROUP_MIN_HEIGHT - NODE_MIN_HEIGHT) / 2
			: Math.max(
					...getNodes()
						.filter((item) => !item.parentId)
						.map((item) => item.position.y + (item.measured?.height ?? 0)),
					DEFAULT_POSITION_Y,
				) + VERTICAL_NODE_GAP;

		const newNode = {
			id: hashString(nodeName),
			type: 'custom-node',
			position: {
				x: positionX,
				y: postionY,
			},
			style: {
				backgroundColor,
				color: textColor,
			},
			measured: { height: NODE_MIN_HEIGHT, width: NODE_MIN_WIDTH },
			data: { label: nodeName, shape: nodeShape },
			...(nodeGroup ? { extent: 'parent', parentId: nodeGroup } : {}),
		} as AppNode;
		if (nodeGroup) {
			nodesInGroup = [...nodesInGroup, newNode];
			const parentNode = getNode(nodeGroup);
			updateNode(nodeGroup, {
				...parentNode,
				measured: {
					...parentNode?.measured,
					width: nodesInGroup.reduce((prevValue, current) => {
						return prevValue + (current.measured?.width ?? 0);
					}, HORIZONTAL_NODE_GAP),
					height:
						Math.max(...nodesInGroup.map((item) => item.measured?.height ?? 0), newNode.measured?.height ?? 0) +
						NODE_GROUP_NODE_ITEM_DIFF_HEIGHT,
				},
				style: {
					...parentNode?.style,
					width: nodesInGroup.reduce((prevValue, current) => {
						return prevValue + (current.measured?.width ?? 0) + HORIZONTAL_NODE_GAP;
					}, HORIZONTAL_NODE_GAP),
					height:
						Math.max(...nodesInGroup.map((item) => item.measured?.height ?? 0), newNode.measured?.height ?? 0) +
						NODE_GROUP_NODE_ITEM_DIFF_HEIGHT,
				},
			});
		}
		addNodes([newNode]);
	};

	return isModalOpen ? (
		<Modal
			isOpen={isModalOpen}
			onDismiss={hideModal}
			isBlocking={false}
			styles={{
				main: {
					padding: 10,
				},
			}}
		>
			<label htmlFor='nodeName'>Node Name:</label>
			<input
				type='text'
				id='nodeName'
				value={nodeName}
				onChange={(e) => {
					setNodeName(e.target.value);
				}}
			/>

			{!isLabeledNode && (
				<Dropdown
					placeholder='Select shape'
					label='Select shape'
					options={NODE_SHAPE_OPTIONS}
					onChange={(_, option) => {
						setNodeShape(option?.key as NodeShapeType);
					}}
					selectedKey={nodeShape}
				/>
			)}

			{!isLabeledNode && (
				<Dropdown
					placeholder='Select group'
					label='Select group'
					options={getNodeGroupOptions(getNodes())}
					onChange={(_, option) => {
						setNodeGroup(option?.key?.toString() ?? '');
					}}
					selectedKey={nodeGroup}
				/>
			)}

			<div>
				<p>Background color:</p>
				<ColorPicker
					color={backgroundColor}
					onChange={(_, color) => {
						setBackgroundColor(color.str);
					}}
					showPreview={true}
					styles={colorPickerStyles}
					strings={{
						hueAriaLabel: 'Hue',
					}}
				/>
			</div>

			<div>
				<p>Text color:</p>
				<ColorPicker
					color={textColor}
					onChange={(_, color) => {
						setTextColor(color.str);
					}}
					showPreview={true}
					styles={colorPickerStyles}
					strings={{
						hueAriaLabel: 'Hue',
					}}
				/>
			</div>

			<PrimaryButton
				onClick={async () => {
					if (node?.id) {
						if (isLabeledNode) {
							updateNode(node.id, {
								...node,
								data: { label: nodeName },
								style: {
									...node.style,
									backgroundColor,
									color: textColor,
								},
								...(nodeGroup ? { parentId: nodeGroup, extent: 'parent', position: { x: 0, y: 0 } } : {}),
							});
						} else {
							if (node.parentId !== nodeGroup) {
								await deleteElements({ nodes: [{ id: node.id }] });
								addNode();
							} else {
								updateNode(node.id, {
									data: { label: nodeName, shape: nodeShape },
									style: {
										backgroundColor,
										color: textColor,
									},
									...(nodeGroup
										? {
												parentId: nodeGroup,
												extent: 'parent',
												position: node?.position ? node.position : { x: 0, y: 0 },
											}
										: {}),
								});
							}
						}
					} else {
						addNode();
					}
					hideModal?.();
				}}
			>
				save
			</PrimaryButton>
		</Modal>
	) : (
		<></>
	);
};

export default DetailModal;
