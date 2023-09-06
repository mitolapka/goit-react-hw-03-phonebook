import React, { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export class App extends Component {
    state = {
        contacts: [],
        filter: '',
        loading: false, 
    };

    async componentDidMount() {
        this.setState({ loading: true });
        try {
            const response = await fetch('https://64f44f85932537f4051a3e4d.mockapi.io/phonebook');
            if (!response.ok) {
                throw new Error('Failed to fetch contacts');
            }
            const contactsList = await response.json();
            this.setState({ contacts: contactsList });
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            this.setState({ loading: false });
        }
    }

    handleContactSubmit = async newContact => {
        this.setState({ loading: true });
        try {
            const response = await fetch('https://64f44f85932537f4051a3e4d.mockapi.io/phonebook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContact),
            });
            if (!response.ok) {
                throw new Error('Failed to add contact');
            }
            const addedContact = await response.json();
            this.setState(prevState => ({
                contacts: [...prevState.contacts, addedContact],
            }));
        } catch (error) {
            console.error('Error adding contact:', error);
        } finally {
            this.setState({ loading: false });
        }
    };

    handleContactDelete = async contactId => {
        this.setState({ loading: true });
        try {
            const response = await fetch(`https://64f44f85932537f4051a3e4d.mockapi.io/phonebook/${contactId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete contact');
            }
            this.setState(prevState => ({
                contacts: prevState.contacts.filter(contact => contact.id !== contactId),
            }));
        } catch (error) {
            console.error('Error deleting contact:', error);
        } finally {
            this.setState({ loading: false });
        }
    };

    handleFilterChange = event => {
        this.setState({ filter: event.target.value });
    };

    render() {
        const { contacts, filter, loading } = this.state;
        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );

        return (
            <div>
                {loading && <div>Loading...</div>}
                <h1>Phonebook</h1>
                <ContactForm onSubmit={this.handleContactSubmit} contacts={this.state.contacts} />

                <h2>Contacts</h2>
                <Filter value={filter} onChange={this.handleFilterChange} />
                {filteredContacts.length > 0 && (
                    <ContactList contacts={filteredContacts} onDeleteContact={this.handleContactDelete} />
                )}
            </div>
        );
    }
}

