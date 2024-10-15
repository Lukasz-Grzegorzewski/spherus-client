import axios from 'axios';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ResetPassword from './ResetPassword';

function EmailVerification() {
  const [codeInput, setCodeInput] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');
  const [timerCount, setTimer] = useState(60);
  const [disable, setDisable] = useState(true);
  const [codeFromDB, setCodeFromDB] = useState(null);
  const { id } = useParams();

  // Création des références pour gérer les inputs :

  const firstInput = useRef(null);
  const secondInput = useRef(null);
  const thirdInput = useRef(null);
  const fourthInput = useRef(null);

  const inputRefs = [firstInput, secondInput, thirdInput, fourthInput];

  // Fonctions qui gèrent l'état des inputs

  function handleChangeInputs(event, nextInput) {
    if (event.target.value.length === 1) {
      nextInput.current.focus();
    }
  }

  // Fonctions qui gère le copier / coller dans les inputs

  function onPaste(event) {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text/plain');
    setCodeInput(pasted.split('').slice(0, codeInput.length));
  }

  function update(index) {
    return (event) => {
      setCodeInput([
        ...codeInput.slice(0, index),
        event.target.value,
        ...codeInput.slice(index + 1),
      ]);
    };
  }

  //  Fonctions appelées au montage de ce composant :

  const getEmailById = useCallback((idUserParam) => {
    axios
      .get(`${import.meta.env.VITE_URL_SPHERUS_API}/users/${idUserParam}`)
      .then((result) => setEmail(result.data.email))
      .catch((err) => console.error(err));
  }, []);

  const getCodeTmp = useCallback((idUserParam) => {
    axios
      .get(
        `${import.meta.env.VITE_URL_SPHERUS_API}/users/code/${idUserParam}`
      )
      .then((result) => setCodeFromDB(result.data[0].code_tmp))
      .catch((err) => console.error(err));
  }, []);

  const resendCodeTimer = useCallback(() => {
    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleResendRandomCode() {
    if (disable) return;
    axios
      .post(`${import.meta.env.VITE_URL_SPHERUS_API}/send_recovery_email`, {
        OTP: codeFromDB,
        recipientEmail: email,
      })
      .then(() => setDisable(true))
      .then(() =>
        alert('A new OTP has succesfully been sent to your email address')
      )
      .then(() => setTimer(60))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getEmailById(id);
    getCodeTmp(id);
    resendCodeTimer();
  }, [resendCodeTimer, getCodeTmp, getEmailById, id]);

  return (
    <div className='login-page'>
      <div className='login-pop-up'>
        <div className='login-pop-up_card'>
          <h2>Code verification</h2>
          <h4>We have sent a code to your email : {email}</h4>
          <form className='code-form'>
            <div className='_numbers'>
              {codeInput.map((input, index) => (
                // eslint-disable-next-line prettier/prettier, jsx-a11y/label-has-associated-control
                <label htmlFor='code_field' key={input + String(index)}>
                  <input
                    className='code-input'
                    ref={inputRefs[index]}
                    value={input}
                    onPaste={onPaste}
                    onInput={update(index)}
                    onChange={(e) =>
                      handleChangeInputs(e, inputRefs[index + 1])
                    }
                  />
                </label>
              ))}
            </div>
            <div className='_resend'>
              <p>Didn't receive the code?</p>
              <button
                type='button'
                className='_link'
                style={{
                  fontFamily: '$font-text',
                  color: disable ? 'gray' : 'blue',
                  cursor: disable ? 'none' : 'pointer',
                  textDecorationLine: disable ? 'none' : 'underline',
                }}
                onClick={() => handleResendRandomCode()}
              >
                {disable ? `Resend code in ${timerCount}s` : 'Resend code'}
              </button>
            </div>
            {Number.parseInt(codeInput.join(''), 10) === codeFromDB ? (
              <ResetPassword />
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
