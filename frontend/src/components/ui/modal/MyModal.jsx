import React from 'react';

const MyModal = ({children, visible, setVisible}) => {
    return (
        <div className="" onClick={() => setVisible(false)}>
            <div className="" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;