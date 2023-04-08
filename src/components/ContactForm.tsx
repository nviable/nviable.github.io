import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios'
import * as qs from 'query-string'
import { navigate } from 'gatsby';

interface ContactFormProps {
    location: {
        pathname: string
    }
}

const ContactForm = (props: ContactFormProps) => {
    const [state, setState] = React.useState({
        name: '',
        email: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [errors, setErrors] = React.useState({} as any)
    const [submitted, setSubmitted] = React.useState(false)
    // const captchaRef = React.useRef<ReCAPTCHA>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onSuccess = (response: string) => {
        console.log('success', response)
        setState({
            name: '',
            email: '',
            message: '',
        })
        setIsSubmitting(false)
        setSubmitted(true)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrors({})

        const myForm: HTMLFormElement = e.currentTarget
        const formData = new FormData(myForm);
        // const recaptchaValue = captchaRef.current?.getValue() || ''
        // if (!recaptchaValue) {
        //     setErrors({ message: 'Please verify that you are not a robot.' })
        //     setIsSubmitting(false)
        //     return
        // }
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData as any).toString()
        })
            .then((res) => {
                onSuccess(res.statusText)
            })
            .catch((err) => {
                setIsSubmitting(false)
                setErrors(err.response.data.errors)
            });
    };


    return submitted ? (
        <div>
            <h2>Thanks for your message!</h2>
        </div>
    ) : (
        <form className="contact-form" name="contact" method="POST"
            data-netlify="true" onSubmit={handleSubmit}
        // data-netlify-recaptcha="true"
        >
            <input type="hidden" name="form-name" value="contact" />
            <h2>Contact Me</h2>
            <div>
                <label>Your Name:</label>
                <input
                    type="name" name="name" placeholder='Your Name'
                    value={state.name} onChange={handleChange}
                />
            </div>
            <div>
                <label>Your Email:</label>
                <input
                    type="email" name="email" placeholder='Your Email'
                    value={state.email} onChange={handleChange}
                />
            </div>
            <div>
                <label>Message:</label>
                <textarea
                    name="message" placeholder='Your Message'
                    value={state.message} onChange={handleChange}
                />
            </div>
            {/* <ReCAPTCHA sitekey={process.env.GATSBY_RECAPTCHA_KEY || ''} ref={captchaRef} /> */}
            {errors.message && <p className="error">{errors.message}</p>}
            <button type="submit" disabled={isSubmitting}>Send</button>
        </form>
    )
}

export default ContactForm