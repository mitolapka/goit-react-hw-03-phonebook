import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { fetchContacts } from './Api';

export class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

    async componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
        this.setState({ contacts: JSON.parse(savedContacts) });
    }
      try {
        this.setState({ loading: true });
        const contactsList = await fetchContacts();
        this.setState ({contacts: contactsList})
        console.log(contactsList);
      }
      catch (error) {
        console.log("error!")
      }
      finally {
        this.setState({loading: false})
      }
    }

    componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
}

    componentWillUnmount() {
        localStorage.removeItem('contacts');
    }

    handleContactSubmit = newContact => {
    this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
    }), () => {
        // Після оновлення стану викликаємо цю функцію для збереження змін у локальному сховищі
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    });
};

    handleContactDelete = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId),
        }));
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
                <ContactForm onSubmit={this.handleContactSubmit} contacts={this.state.contacts}/>

                <h2>Contacts</h2>
            <Filter value={filter} onChange={this.handleFilterChange} />
            {filteredContacts.length > 0 && (
              <ContactList contacts={filteredContacts} onDeleteContact={this.handleContactDelete} />)}
            </div>
        );
    }
}

export default App;
