import React, {useEffect} from 'react';

const MyModal = ({children, visible, setVisible}) => {
    useEffect(() => {
        if (visible) {
            const count = parseInt(document.body.dataset.modalCount || '0');
            document.body.dataset.modalCount = count + 1;
            document.body.style.overflow = "hidden";
        }

        return () => {
            const count = parseInt(document.body.dataset.modalCount || '1') - 1;
            document.body.dataset.modalCount = count + 1;

            if (count <= 0) {
                document.body.style.overflow = "auto";
                delete document.body.dataset.modalCount;
            }
        }
    }, [visible]);

    return (
        <div className={
            visible
                ? "fixed z-[200] bg-opacity-80 top-0 left-0 w-full h-full bg-[#000] flex flex-col items-center opacity-100 transition-opacity duration-300"
                : "fixed z-[200] bg-opacity-0 top-0 left-0 w-full h-full bg-[#000] flex flex-col items-center opacity-0 scale-0"
        } onClick={() => setVisible(false)}>
            <div className={
                visible
                    ? "max-h-[80vh] overflow-y-auto bg-[#fff] w-1/2 m-auto rounded-[15px] px-[50px] transition-colors duration-1000 py-[30px]"
                    : ""
            } onClick={(e) => e.stopPropagation()}>
                <div>
                    <div     className="ml-auto w-[35px] h-[35px] flex items-center justify-center cursor-pointer text-[28px] transition-all duration-150 font-bold opacity-60 hover:opacity-100" onClick={() => setVisible(false)}>
                        x
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MyModal;