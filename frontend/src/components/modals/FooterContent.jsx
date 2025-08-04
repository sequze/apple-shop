import React from 'react';

const FooterContent = ({contents}) => {
    return (
        <>
            {contents.map((content, index) => (
                <div
                    key={index}
                    className="flex flex-col items-start">
                    {content}
                </div>
            ))}
        </>
    );
};

export default FooterContent;