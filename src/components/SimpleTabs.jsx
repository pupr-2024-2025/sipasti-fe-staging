const SimpleTabs = ({ items, onChange, selectedValue, button }) => {
    const handleClick = (tabIndex) => {
        onChange(tabIndex);
    };

    return (
        <div>
            <div className="flex justify-between">
                <div className="inline-flex space-x-2 bg-custom-neutral-100 rounded-[16px] p-2 h-[60px]">
                    {items.map((item, tabIndex) => (
                        <button
                            key={tabIndex}
                            type="button"
                            onClick={() => handleClick(tabIndex)}
                            className={`px-4 py-3 text-Small rounded-[12px] transition-all duration-300 cursor-pointer whitespace-nowrap ${selectedValue === tabIndex
                                    ? "bg-custom-blue-500 text-emphasis-on_color-high"
                                    : "text-emphasis-on_surface-medium hover:bg-surface-light-overlay"
                                }`}>
                            {item}
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-3">
                    {button && (
                        <button
                            type="button"
                            className={`${button.variant === "solid_blue"
                                    ? "bg-custom-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                                } px-4 py-2 rounded-lg`}
                            onClick={
                                button.onClick || (() => console.log("Button clicked!"))
                            }>
                            {button.label || "Button"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimpleTabs;
