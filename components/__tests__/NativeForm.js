import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import PersonalDataForm  from '../NativeForm';

test('date of birth does not accept < 1900', async () => {
  jest.mock('react-native/Libraries/Components/DatePicker/DatePickerIOS.ios.js', () => {
    const React = require('React');
    return class MockPicker extends React.Component {
      render() {
        return React.createElement('DatePicker', {date: '01.01.2022'});
      }
    };
  });
  const handleSubmit = jest.fn();

  const {
    getByTestId,
    getByText,
    getByA11yRole
  } = render(<PersonalDataForm onSubmit={handleSubmit} />);

  const dateInput = getByTestId('dateTimePicker');
  const submitButton = getByText('Submit');

  fireEvent.changeText(dateInput,'31.12.1899');
  fireEvent.press(submitButton);

  const dateError = waitFor(() => getByA11yRole('alert'));
  expect(getByA11yRole('alert')).toHaveTextContent("You're too old to buy our products.");
});

test('date of birth does not accept future dates', () => {
});
