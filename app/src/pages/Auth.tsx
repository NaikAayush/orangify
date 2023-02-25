import React from "react";
import { formatPhoneNumber, isValidPhoneNumber } from "../utils/formatStrings";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import PhoneInput from "../components/PhoneInput";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}
export type PhoneFormReturn = {
  phoneNumber: string;
  recaptchaVerifier: RecaptchaVerifier;
};

type FormProps = {
  submitFn: (val: PhoneFormReturn) => void;
  errorMsg: string;
};

const PhoneAuthForm = () => {
  //   const [phoneNumber, setPhoneNumber] = React.useState("");

  //   const auth = getAuth();

  //   React.useEffect(() => {
  //     setPhoneNumber("+919731306404");
  //     const recaptchaVerifier = new RecaptchaVerifier(
  //       "sign-in-button",
  //       {
  //         size: "invisible",
  //         callback: (response: any) => {
  //           console.log(response);
  //           // reCAPTCHA solved, allow signInWithPhoneNumber.
  //           submitFn({ phoneNumber, recaptchaVerifier });
  //         },
  //       },
  //       auth
  //     );
  //     window.recaptchaVerifier = recaptchaVerifier;
  //   }, []);

  //   function onChangePhone(event: React.ChangeEvent<HTMLInputElement>) {
  //     // const number = formatPhoneNumber(event?.target.value);
  //     console.log(event?.target.value);
  //     setPhoneNumber("+919731306404");
  //   }

  //   function submitPhone(event: React.FormEvent<HTMLFormElement>) {
  //     event.preventDefault();
  //     submitFn({ phoneNumber, recaptchaVerifier: window.recaptchaVerifier });
  //   }

  return (
    <PhoneInput></PhoneInput>
    // <Form onSubmit={submitPhone}>
    //   <FormGroup className="text-right" row>
    //     <Label for="email" xs={3}>
    //       Email
    //     </Label>
    //     <Col xs={9}>
    //       <Input
    //         type="text"
    //         // name="phone"
    //         // id="phone"
    //         placeholder="Enter your mobile phone number"
    //         onChange={onChangePhone}
    //         value={phoneNumber}
    //         // valid={isValidPhoneNumber(phoneNumber)}
    //         required
    //       />
    //     </Col>
    //   </FormGroup>
    //   <Col className="text-center">
    //     <Alert isOpen={!!errorMsg}>{errorMsg}</Alert>
    //     <Button
    //       id="sign-in-button"
    //       color="primary"
    //       type="submit"
    //       //   disabled={!isValidPhoneNumber(phoneNumber)}
    //     >
    //       Create Phone Account
    //     </Button>
    //   </Col>
    // </Form>
  );
};

export default PhoneAuthForm;
