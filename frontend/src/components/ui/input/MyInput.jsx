import React from 'react';

const MyInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className="text-[20px] border-b-2  w-full pb-[10px] border-[#D9D9D9] transition-all duration-150 focus:border-[#0171E2]"  {...props}/>
    );
});

export default MyInput;