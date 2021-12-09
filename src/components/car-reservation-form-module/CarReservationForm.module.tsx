import { FC, FocusEvent, useState } from 'react'
import styles from './CarReservationForm.module.css'

const CarReservationForm: FC = () => {
    const carModelsByCategory = [
        { category: "Small", 
            models: [
                {id: 1, name: "Opel Corsa"},
                {id: 2, name: "Toyota Yaris"},
                {id: 3, name: "Smart for Two"}
            ]
        },
        { category: "Premium", 
            models: [
                {id: 1, name: "Audi S8"},
                {id: 2, name: "Jaguar XJR"},
                {id: 3, name: "BMW 750iL"}
            ]
        },
        { category: "Van", 
            models: [
                {id: 1, name: "Volkswagen Touran"},
                {id: 2, name: "Renault Espace"},
                {id: 3, name: "Fiat Talento"}
            ]
        }
    ];

    const [isValidName, setIsValidName] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPhoneNumber, setisValidPhoneNumber] = useState(true);
    const [carModels, setCarModels] = useState([{id: 0, name: ""}]);
    const [isCarCategorySelected, setIsCarCategorySelected] = useState(true);
    const [isCarModelSelected, setIsCarModelSelected] = useState(true);

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
        } else if (targetElementName === "Phone") {
            const phoneNumberValidatorRegEx: RegExp =  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/i;
            if (targetElementValue.match(phoneNumberValidatorRegEx)) {
                setisValidPhoneNumber(true);
                return;
            }
            setisValidPhoneNumber(false);
        }
    };

    const onCarCategoryChangeHandler = (event: any) => {
        const selectedCategory = event.target.value;
        setCarModels([]);

        if (selectedCategory) {
            const selectedCarModels = carModelsByCategory.filter(carModel => selectedCategory === carModel.category)[0].models;
            setCarModels(selectedCarModels);
            setIsCarCategorySelected(true);
            return;
        }
        setIsCarCategorySelected(false);
    };

    const onCarModelChangeHandler = (event: any) => {
        if (isCarCategorySelected) {
            const selectedModel = event.target.value;

            if (selectedModel) {
                setIsCarModelSelected(true);
                return;
            }
        }

        setIsCarModelSelected(false);
    };

    return (
        <div>
            <form>
                <fieldset>
                    <legend>Car Reservation</legend>
                    <div className={styles.form_info}>
                        <input
                            type="name"
                            placeholder="Name"
                            name="Name"
                            onBlur={blurHandler}
                            required />
                        {!isValidName && <div className={styles.error_message}>Invalid Name</div>}
                    </div>
                    <div className={styles.form_info}>
                        <input
                            type="email"
                            placeholder="Email"
                            name="Email"
                            onBlur={blurHandler}
                            required />
                        {!isValidEmail && <div className={styles.error_message}>Invalid Email</div>}
                    </div>
                    <div className={styles.form_info}>
                        <input
                            placeholder="Phone"
                            name="Phone"
                            onBlur={blurHandler} />
                        {!isValidPhoneNumber && <div className={styles.error_message}>Invalid Phone number</div>}
                    </div>
                    <div>
                        <div className={styles.select}>
                            <select
                                className={styles.select_text}
                                name="carCategory"
                                onChange={onCarCategoryChangeHandler}>
                                <option value="">Car Category</option>
                                <option value="Small">Small</option>
                                <option value="Premium">Premium</option>
                                <option value="Van">Van</option>
                            </select>
                        </div>
                        {!isCarCategorySelected && <div className={styles.error_message}>Please select a category</div>}
                    </div>
                    <div>
                        <div className={styles.select}>
                            <select
                                name="carModel"
                                className={styles.select_text}
                                onChange={onCarModelChangeHandler}>
                                <option value="">Car Model</option>
                                {carModels.length > 1 && carModels.map((carModel) => (
                                    <option key={carModel.id} value={carModel.name}>{carModel.name}</option>
                                ))}
                            </select>
                        </div>
                        {!isCarCategorySelected && <div className={styles.error_message}>Please select a car category</div>}
                        {isCarCategorySelected && !isCarModelSelected && <div className={styles.error_message}>Please select a model</div>}
                    </div>
                    <div className={styles.form_submit}>
                        <button className={styles.button}>
                            <span>Submit</span>
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default CarReservationForm;