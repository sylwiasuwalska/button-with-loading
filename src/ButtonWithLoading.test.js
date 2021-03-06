import React from "react";
import { act, fireEvent, render } from "@testing-library/react";

import ButtonWithLoading from "./ButtonWithLoading";
import { action } from "./App";

jest.mock("./App", () => ({
  action: jest.fn(),
}));

// - po wyrenderowaniu jest tagiem button
test("renders button", () => {
  const { getByRole } = render(<ButtonWithLoading children action />);
  const button = getByRole("button");
  expect(button).toBeInTheDocument();
});

// - to co trafia do children jest w tagu button
test("renders children as button tag", () => {
  const { getByRole } = render(
    <ButtonWithLoading onClick action>
      this is in button tag
    </ButtonWithLoading>
  );
  const button = getByRole("button");
  expect(button).toHaveTextContent("this is in button tag");
});

// - jeśli nic nie ma w propsie children text buttona to "don't push my buttons"
test("if renders without children props, set specific text on button", () => {
  const { getByRole } = render(
    <ButtonWithLoading onClick action></ButtonWithLoading>
  );
  const button = getByRole("button");
  expect(button).toHaveTextContent("don't push my buttons");
});

//- kiedy button zostanie kliknięty wyświetli w buttonie text "loading..." oraz
test("on click display 'loading'", () => {
  action.mockResolvedValue("success");

  const { getByRole } = render(
    <ButtonWithLoading onClick={(data) => {}} children action={action} />
  );
  const button = getByRole("button");

  act(async () => {
    fireEvent.click(button);
  });

  expect(button).toHaveTextContent("loading");
  expect(button).not.toHaveTextContent("don't push my buttons");
  action.mockClear();
});

// - na kliknięciu wykona się promise przekazaną w propsie action

test("on click action is called", async () => {
  action.mockResolvedValue("success");
  const { getByRole } = render(
    <ButtonWithLoading onClick={(data) => {}} children action={action} />
  );
  const button = getByRole("button");
  await act(async () => {
    fireEvent.click(button);
  });
  expect(action).toHaveBeenCalledTimes(1);
  action.mockClear();
});

// - po wykonaniu się promisy poprawnie, text buttona zmienia się na "success"
test("after promise resolved button text is set to success", async () => {
  action.mockResolvedValue("success");
  const onClickData = jest.fn( data => data);
  const { getByRole } = render(
    <ButtonWithLoading onClick={onClickData} children action={action} />
  );
  const button = getByRole("button");
  await act(async () => {
    fireEvent.click(button);
  });
  expect(button).toHaveTextContent("success");
  expect(onClickData).toHaveReturnedWith("success")
  action.mockClear();
});

// - po wykonaniu się promisy z błędem, text buttona zmienia się na "error"
test("after promise rejected button text is set to error", async () => {
  action.mockRejectedValue("error");
  const onClickData = jest.fn( data => data);
  const { getByRole } = render(
    <ButtonWithLoading onClick={onClickData} children action={action} />
  );
  const button = getByRole("button");
  await act(async () => {
    fireEvent.click(button);
  });
  expect(button).toHaveTextContent("error");
  expect(button).not.toHaveTextContent("success");
  expect(onClickData).toHaveReturnedWith("error")
  action.mockClear();
});

// - ***kiedy button zostanie kliknięty nie będzie można w niego ponownie kliknąć w czasie ładowania
test("button is disabled during loading", () => {
  action.mockResolvedValue("success");
  const { getByRole } = render(
    <ButtonWithLoading onClick={(data) => {}} children action={action} />
  );
  const button = getByRole("button");
  act(async () => {
    fireEvent.click(button);
  });
  expect(button).toBeDisabled();
});
