import React from 'react'

interface ContactFormProps {
    onSuccess: () => void
}

const ContactForm = (props: ContactFormProps) => {
    const [state, setState] = React.useState({})
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [errors, setErrors] = React.useState({} as any)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const encode = (data: any) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&')
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        const form = e.currentTarget
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({ 'form-name': form.getAttribute('name'), ...form }),
        })
            .then(() => {
                props.onSuccess()
                setIsSubmitting(false)
            })
            .catch((error) => {
                setErrors(error)
                setIsSubmitting(false)
            })
    }

    return (
        <form
            name="contact"
            method="post"
            action="/thanks/"
            className="contact-form"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
        >
            <h2>Contact Me</h2>
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
                <label>
                    Don't fill this out: <input name="bot-field" onChange={handleChange} />
                </label>
            </p>
            <label>Name: <input type="text" name="name" value="" placeholder='Your Name' onChange={handleChange} /></label>
            <label>Email: <input type="email" name="email" value="" placeholder='Your Email' onChange={handleChange} /></label>
            <label>Message: <textarea name="message" onChange={handleChange} /></label>
            <button type="submit" disabled={isSubmitting}>Send</button>
            {errors && <p className="error">{errors.message}</p>}
        </form>
    )
}

export default ContactForm