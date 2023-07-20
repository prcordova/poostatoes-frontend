import ReCAPTCHA from "react-google-recaptcha";

export default function Recaptcha(value, onChange) {
  return (
    <ReCAPTCHA
      sitekey="Your client site key"
      value={value}
      onChange={onChange}
    />
  );
}
