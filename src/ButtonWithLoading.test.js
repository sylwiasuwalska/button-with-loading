import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import ButtonWithLoading from "./ButtonWithLoading";

// zaprojektuj testy, w których upewnisz się, że powyższy komponent działa poprawnie

// komponent ButtonWithLoading działa poprawnie jeśli:
// - po wyrenderowaniu jest tagiem button
// - to co trafia do children jest w tagu button
// - jeśli nic nie ma w propsie children text buttona to "don't push my buttons"
// - kiedy button zostanie kliknięty wyświetli w buttonie text "loading..." oraz
// - na kliknięciu wykona się promise przekazaną w propsie action
// - po wykonaniu się promisy poprawnie, text buttona zmienia się na "success"
// - po wykonaniu się promisy z błędem, text buttona zmienia się na "error"
// - ***kiedy button zostanie kliknięty nie będzie można w niego ponownie kliknąć w czasie ładowania

// - po wyrenderowaniu jest tagiem button
test('renders button', () => {
    const { getByText, getByRole } = render(<ButtonWithLoading onClick children action />);
    const button = getByRole('button')
    expect(button).toBeInTheDocument();
});

// - to co trafia do children jest w tagu button
test('renders children as button tag', () => {
    const childrenText = "this is in button tag"
    const { getByRole } = render(<ButtonWithLoading onClick children={childrenText} action />);
    const button = getByRole('button');
    expect(button).toHaveTextContent(childrenText);
});

//- kiedy button zostanie kliknięty wyświetli w buttonie text "loading..." oraz
test('renders children as button tag', () => {
    const childrenText = "this is in button tag"
    const { getByRole } = render(<ButtonWithLoading onClick children={childrenText} action />);
    const button = getByRole('button');
    fireEvent.click(button)
    expect(button).toHaveTextContent(childrenText);
});


// - ***kiedy button zostanie kliknięty nie będzie można w niego ponownie kliknąć w czasie ładowania
test('button is disabled during loading', () => {
    const {getByRole } = render(<ButtonWithLoading onClick children="loading..." action />);
    const button = getByRole('button')
    expect(button).toBeDisabled();
});