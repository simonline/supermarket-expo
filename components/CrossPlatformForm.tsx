import React, {useState} from "react";
import * as Yup from "yup";
import {StyleSheet} from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Switch, Snackbar, Button } from 'react-native-paper';

import {Formik, FormikValues} from "formik";
import {Text, View} from "./Themed";

const CrossPlatformFormSchema = Yup.object().shape({
});

export default function CrossPlatformForm() {
  const [visible, setVisible] = React.useState(true);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const today = new Date();
  return (
    <PaperProvider >
      <Formik
        initialValues={{ email: "test@vitolus.de", switch: false }}
        validationSchema={CrossPlatformFormSchema}
        onSubmit={(values: FormikValues) => console.log(values)}
      >
        {({values, setFieldValue, handleSubmit, errors, touched}) => (
          <View style={styles.form}>
            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
            >
              Hey there! I'm a Snackbar.
            </Snackbar>
            <TextInput
              label="Email"
              value={values.email}
              style={styles.input}
              onChangeText={email => setFieldValue("email", email)}
            />
            <Switch
              value={values.switch}
              onValueChange={email => setFieldValue("switch", !values.switch)}
            />
            <Button
              onPress={handleSubmit}
              style={styles.submit}
              title="Submit"
            />
          </View>
        )}
      </Formik>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingVertical: 20,
    alignSelf: 'stretch'
  },
  input: {
    width: 300,
    paddingHorizontal: 5,
    marginVertical: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  submit: {
    marginTop: 30,
  }
});

