import { Button} from './MyForm.styled'
const ContactItem = ({ id, name, number, onDelete }) => {
    return (
        <li>
            {name}: {number}
            <Button onClick={() => onDelete(id)}>Delete</Button>
        </li>
    );
};

export default ContactItem;
