import React, { Component } from "react";
import Container from "./Container/Container";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./FilterForm/FilterForm";
import uuid from "../../node_modules/uuid/dist/v4";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contact;

    if (nextContacts !== prevContacts) {
      console.log("Обновилось поле contacts, записываю contacts в хранилище");
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: uuid(),
      name,
      number,
    };
    this.state.contacts.some((i) => i.name === contact.name)
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  OnDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((i) => i.id !== id),
    }));
  };

  changeFilterInput = (e) => {
    this.setState({ filter: e.target.value });
  };
  onFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} changeFilterInput={this.changeFilterInput} />
        <ContactList
          contacts={this.onFilteredContacts()}
          onDeleteClick={this.OnDeleteContact}
        />
      </Container>
    );
  }
}

export default App;
