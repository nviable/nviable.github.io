import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios'
import * as qs from 'query-string'

interface ContactFormProps {
    onSuccess?: () => void
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrors({})
        axios({
            method: 'POST',
            url: props.location.pathname,
            data: qs.default.stringify({
                'form-name': 'contact',
                ...state,
            }),
        })
            .then(res => {
                setIsSubmitting(false)
                setState({
                    name: '',
                    email: '',
                    message: '',
                })
                if (props.onSuccess) {
                    props.onSuccess()
                }
            })
            .catch(err => {
                setIsSubmitting(false)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <form className="contact-form" name="contact" method="POST" data-netlify="true">
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
            <ReCAPTCHA sitekey={process.env.GATSBY_RECAPTCHA_KEY || ''} />
            {errors.message && <p className="error">{errors.message}</p>}
            <button type="submit">Send</button>
        </form>
    )
}

export default ContactForm