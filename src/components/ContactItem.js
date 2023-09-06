import { Button} from './MyForm.styled'
export const ContactItem = ({ id, name, number, onDelete }) => {
    return (
        <li>
            {name}: {number}
            <Button onClick={() => onDelete(id)}>Delete</Button>
        </li>
    );
};


