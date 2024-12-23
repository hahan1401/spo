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
	VERTICAL_NODE_GAP,
} from '../../../../Constants';
import { NODE_TYPE } from '../../../../types/common';
import { hashString } from '../../../../Utils';
import { AppNode } from '../nodes/types';

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
	const [backgroundColor, setBackgroundColor] = useState(node?.style?.backgroundColor ?? '#fff');
	const [textColor, setTextColor] = useState(node?.style?.color ?? '#000');

	const onCloseModal = () => {
		setNodeName('');
		setNodeGroup('');
		hideModal?.();
		setBackgroundColor('#fff');
		setTextColor('#000');
	};

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
			data: { label: nodeName },
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

	return (
		<Modal
			isOpen={isModalOpen}
			onDismiss={onCloseModal}
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
									data: { label: nodeName },
									style: {
										backgroundColor,
										color: textColor,
									},
									...(nodeGroup ? { parentId: nodeGroup, extent: 'parent', position: { x: 0, y: 0 } } : {}),
								});
							}
						}
					} else {
						addNode();
					}
					onCloseModal();
				}}
			>
				save
			</PrimaryButton>
		</Modal>
	);
};

export default DetailModal;
