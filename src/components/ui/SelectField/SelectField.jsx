'use client';
import { useState } from 'react';
import style from './SelectField.module.scss';

const SelectField = ({ items = [], name = 'select' }) => {
	const [selectedOption, setSelectedOption] = useState('apple');

	const options = ['apple', 'banana', 'orange'];

	const handleChange = (event) => {
		setSelectedOption(event.target.value);
	};

	return (
		<div className={style.SelectField}>
			{/* <label htmlFor={name}>Choose a fruit: </label> */}
			<select id={name} value={selectedOption} onChange={handleChange}>
				{items.map((item, index) => (
					<option key={'option-' + index} value={item?.value}>
						{item?.text}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectField;
