import React from "react";
import { fireEvent, render } from "@testing-library/react";

import ButtonWithLoading from "./ButtonWithLoading";
import { action } from "./App"


// - po wyrenderowaniu jest tagiem button
test("renders button", () => {
  const { getByRole } = render(
    <ButtonWithLoading children action />
  );
  const button = getByRole("button");
  expect(button).toBeInTheDocument();
});

// - to co trafia do children jest w tagu button
test("renders children as button tag", () => {
  const childrenText = "this is in button tag";
  const { getByRole } = render(
    <ButtonWithLoading onClick children={childrenText} action />
  );
  const button = getByRole("button");
  expect(button).toHaveTextContent(childrenText);
});

// - jeśli nic nie ma w propsie children text buttona to "don't push my buttons"
test("if renders without children props set text on button", () => {
  const { getByRole } = render(
    <ButtonWithLoading onClick children={""} action />
  );
  const button = getByRole("button");
  expect(button).toHaveTextContent("don't push my buttons");
});

//- kiedy button zostanie kliknięty wyświetli w buttonie text "loading..." oraz
test("on click display 'loading'", () => {

  const { getByRole, rerender } = render(
    <ButtonWithLoading children action={action} />
  );
  const button = getByRole("button");
  fireEvent.click(button);
  rerender(
    <ButtonWithLoading children action={action} />
  );
  expect(button).toHaveTextContent("loading");
});

// - na kliknięciu wykona się promise przekazaną w propsie action
test("on click action is called", () => {
  const { getByRole} = render(
      <ButtonWithLoading children action={action} />
  );
  const button = getByRole("button");
  fireEvent.click(button);
  expect(action).toHaveBeenCalled()
});


// - po wykonaniu się promisy poprawnie, text buttona zmienia się na "success"
test("after promise resolved button text is set to success", () => {
  const { getByRole} = render(
      <ButtonWithLoading children action={action} />
  );
  const button = getByRole("button");
  fireEvent.click(button);
  return expect(action()).resolves.toBe('success');

});
// - po wykonaniu się promisy z błędem, text buttona zmienia się na "error"


// - ***kiedy button zostanie kliknięty nie będzie można w niego ponownie kliknąć w czasie ładowania
test("button is disabled during loading", () => {
  const { getByRole } = render(
    <ButtonWithLoading onClick children="loading..." action />
  );
  const button = getByRole("button");
  expect(button).toBeDisabled();
});
