import { useState } from 'react';
import style from './InputField.module.scss';
import EyeIcon from '@/components/icons/EyeIcon.svg';
import OpenEyeIcon from '@/components/icons/OpenEyeIcon.svg';

const InputField = ({ icon, type = 'text', name = 'another', className = '',label = '', labelColor = 'text-black', value, onChange, required = false, }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${style.InputField} ${className} p-1`} >
      <label
        className={`c_input_label flex items-center mb-1 py-1 ${labelColor}`}
        htmlFor={name}
      >
        {icon}
        <div className="text-sm">{label}</div>
      </label>

      <input
        id={name}
        name={name}
        type={showPassword ? 'text' : type}
        className={`w-full bg-[#F2F2F2] py-[0.43rem] px-3 rounded-md ${type === 'password' ? 'pr-11' : ''}`}
        value={value}
        onChange={onChange}
        required={required}
      />

      {type === 'password' && (
        <button
          type="button"
          className="eye"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <OpenEyeIcon /> : <EyeIcon />}
        </button>
      )}
    </div>
  );
};

export default InputField;
