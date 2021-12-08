import { FC, FocusEvent, useState } from 'react'
import styles from './CarReservationForm.module.css'

const CarReservationForm: FC = () => {
    const [isValidName, setIsValidName] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const blurHandler = (event: FocusEvent<HTMLInputElement>) => {
        const targetElementName: string = event.target.name;
        const targetElementValue: string = event.target.value;
    
        if (targetElementName === "Name") {
            const nameValidatiorRegEx: RegExp = /^[a-z][a-z\s]*$/i;
            if (targetElementValue.match(nameValidatiorRegEx)) {
                setIsValidName(true);
                return;
            }
            setIsValidName(false);
        } else if (targetElementName === "Email") {
            const emailValidatorRegEx: RegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (targetElementValue.match(emailValidatorRegEx)) {
                setIsValidEmail(true);
                return;
            }
            setIsValidEmail(false);
        }
    };

    return (
        <div>
            <form>
                <fieldset>
                    <legend>Car Reservation</legend>
                    <input
                        className={styles.form_input}
                        type="name"
                        placeholder="Name"
                        name="Name"
                        onBlur={blurHandler}
                        required />
                    {!isValidName && <p className={styles.error_message}>Invalid Name</p>}
                    <br />
                    <input
                        className={styles.form_input}
                        type="email"
                        placeholder="Email"
                        name="Email"
                        onBlur={blurHandler}
                        required />
                    {!isValidEmail && <p className={styles.error_message}>Invalid Email</p>}
                    <br />
                    <input
                        className={styles.form_input}
                        type="number"
                        placeholder="Phone" />
                    <br />
                </fieldset>
            </form>
        </div>
    );
};

export default CarReservationForm;