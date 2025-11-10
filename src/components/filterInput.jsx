import React from 'react';

const FilterInput = ({filter, onFilterChange}) => {
    return (
        <div className="filter">
            <input type="text" value={filter} placeholder="filter coins"
                   onChange={(e) => onFilterChange(e.target.value)}/>
        </div>
    );
};

export default FilterInput;