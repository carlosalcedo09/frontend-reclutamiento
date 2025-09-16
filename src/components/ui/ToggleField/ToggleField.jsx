import { useEffect } from 'react';
import style from './ToggleField.module.scss';

const ToggleField = (props) => {
	const { items = [], onChange, className, defaulValue, value = '', setValue } = props;
	//const [value, setValue] = useState();

	useEffect(() => {
		setValue(defaulValue);
	}, [defaulValue]);

	return (
		<div className={`ToggleField ${style.ToggleField} ${className || ''}`}>
			{items.map((item, index) => (
				<button
					key={'ToggleItem-' + index}
					className={`${style.toggle_item} toggle_item ${
						value === item.value ? style.active : ''
					}`}
					onClick={() => setValue(item?.value)}
				>
					<div className="text">{item?.text}</div>
				</button>
			))}
		</div>
	);
};

export default ToggleField;
