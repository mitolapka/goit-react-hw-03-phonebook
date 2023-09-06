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

    componentDidMount() {
        this.setState({ loading: true });
        const savedContacts = localStorage.getItem('contacts');
        if (savedContacts) {
            this.setState({ contacts: JSON.parse(savedContacts) });
        }
        this.setState({ loading: false });
    }

    handleContactSubmit = newContact => {
        this.setState(prevState => ({
            contacts: [...prevState.contacts, newContact],
        }), () => {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        });
    };

    handleContactDelete = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId),
        }), () => {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        });
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
