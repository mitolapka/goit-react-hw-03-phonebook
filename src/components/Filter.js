import { Label, Div} from './MyForm.styled'
import React from 'react';

export const Filter = ({ value, onChange }) => {
    return (
        <Div>
            <Label htmlFor="filter">Search by name:</Label>
            <input
                type="text"
                name="filter"
                id="filter"
                value={value}
                onChange={onChange}
            />
        </Div>
    );
};

