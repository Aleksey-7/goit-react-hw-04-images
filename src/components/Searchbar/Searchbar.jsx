import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';
import { GoSearch } from 'react-icons/go';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onChange = evt => {
    setQuery(evt.currentTarget.value);
  };

  const onSubmitForm = evt => {
    evt.preventDefault();

    if (!query.trim()) {
      return alert('Please, enter some data!');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={onSubmitForm}>
        <Button type="submit" style={{ marginRight: '10px' }}>
          <Label>
            <GoSearch />
          </Label>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
