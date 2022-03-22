import React, {useState} from "react";
import * as Yup from "yup";
import {differenceInDays, parse} from "date-fns";
import {Button, StyleSheet} from "react-native";
import DatePicker from 'react-native-datepicker';

import {Formik, FormikConfig, FormikValues} from "formik";
import {Text, View} from "./Themed";

const NativeFormSchema = Yup.object().shape({
  date: Yup.date()
    .max(new Date(), "You're too young to buy our products.")
    .min(new Date(2022, 2, 1), "You're too old to buy our products.")
});

interface NativeFormValues {
  date: Date;
}

interface NativeFormProps {
  onSubmit: FormikConfig<NativeFormValues>["onSubmit"];
}

export default function NativeForm({onSubmit}: NativeFormProps) {
  const [daysBetween, setDaysBetween] = useState(0);
  const today = new Date();
  return (
    <Formik
      initialValues={{date: today}}
      validationSchema={NativeFormSchema}
      onSubmit={onSubmit}
    >
      {({values, setFieldValue, handleSubmit, errors, touched}) => (
        <View style={styles.form}>
          <DatePicker
            date={values.date}
            mode="date"
            placeholder="Select your date of birth"
            format="DD.MM.YYYY"
            // minDate="01.01.1900"
            // maxDate={today}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(dateStr: string) => {
              const date = parse(dateStr, "dd.MM.yyyy", new Date());
              setFieldValue('date', date);
              setDaysBetween(differenceInDays(new Date(), date));
            }}
            style={styles.input}
            name="date"
            testID="dateTimePicker"
          />
          {(errors.date && (
            <Text accessibilityRole="alert" style={styles.error}>
              {errors.date}
            </Text>
          )) || (daysBetween && (
            <Text accessibilityRole="alert" style={styles.daysBetween}>
              The date picked was {daysBetween} days ago.
            </Text>
          )) || <Text />}
          <Button
            onPress={handleSubmit}
            style={styles.submit}
            title="Submit"
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingVertical: 20,
    width: '80%',
    flex: 1,
  },
  input: {
    width: '100%',
    paddingHorizontal: 5,
    marginVertical: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  daysBetween: {
    color: 'green',
    marginBottom: 20,
  },
  submit: {
    marginTop: 30,
  }
});

