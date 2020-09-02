import React from 'react';
import { SortableContainer } from "react-sortable-hoc";

import DraggableColorBox from './DraggableColorBox';

function DraggableColorList(props) {
	const { colors, deleteColor } = props;

	return (
		<div style={{ height: '100%' }}>
			{colors.map((color, i) =>
				<DraggableColorBox
					key={color.name}
					name={color.name}
					color={color.color}
					index={i}
					handleDelete={deleteColor}
				/>
			)}
		</div>
	)
}

export default SortableContainer(DraggableColorList);


