import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import PersonalDataForm  from '../NativeForm';

test('date of birth does not accept < 1900', async () => {
  const handleSubmit = jest.fn();
  const {
    getByTestId,
    getByText,
    getByA11yRole
  } = render(<PersonalDataForm onSubmit={handleSubmit}/>);

  const dateInput = getByTestId('dateTimePicker');
  const submitButton = getByText('Submit');

  fireEvent.changeText(dateInput,'31.12.1899');
  fireEvent.press(submitButton);

  await waitFor(() => {
    const dateError = getByA11yRole('alert');
    return expect(dateError.children[0]).toBe("You're too old to buy our products.");
  });
});

test('date of birth does not accept future dates', async () => {
  const handleSubmit = jest.fn();
  const {
    getByTestId,
    getByText,
    getByA11yRole
  } = render(<PersonalDataForm onSubmit={handleSubmit}/>);

  const dateInput = getByTestId('dateTimePicker');
  const submitButton = getByText('Submit');

  fireEvent.changeText(dateInput,'31.03.2022');
  fireEvent.press(submitButton);

  await waitFor(() => {
    const dateError = getByA11yRole('alert');
    return expect(dateError.children[0]).toBe("You're too young to buy our products.");
  });
});
