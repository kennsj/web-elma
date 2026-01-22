"use client"

import { useState } from "react"

interface ContactFormData {
	name: string
	email: string
	subject: string
	message: string
}

export default function ContactForm() {
	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				setIsSubmitted(true)
				setFormData({
					name: "",
					email: "",
					subject: "",
					message: "",
				})
			} else {
				const error = await response.json()
				throw new Error(error.error || "Something went wrong")
			}
		} catch (error) {
			console.error("Error submitting form:", error)
			alert("Det oppstod en feil ved sending av skjemaet. Prøv igjen senere.")
		} finally {
			setIsSubmitting(false)
		}
	}

	if (isSubmitted) {
		return (
			<div className='contact-success'>
				<h3>Takk for din henvendelse!</h3>
				<p>Vi har mottatt din melding og vil svare så snart som mulig.</p>
				<button
					onClick={() => setIsSubmitted(false)}
					className='secondary-button'
				>
					Send ny melding
				</button>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className='contact-form'>
			<div className='form-group'>
				<label htmlFor='name'>Navn *</label>
				<input
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={handleChange}
					required
					disabled={isSubmitting}
				/>
			</div>

			<div className='form-group'>
				<label htmlFor='email'>E-post *</label>
				<input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
					disabled={isSubmitting}
				/>
			</div>

			<div className='form-group'>
				<label htmlFor='subject'>Emne *</label>
				<select
					id='subject'
					name='subject'
					value={formData.subject}
					onChange={handleChange}
					required
					disabled={isSubmitting}
				>
					<option value=''>Velg emne</option>
					<option value='foredrag'>Bestille foredrag</option>
					<option value='samarbeid'>Samarbeid</option>
					<option value='media'>Media/presse</option>
					<option value='personlig'>Personlig henvendelse</option>
					<option value='annet'>Annet</option>
				</select>
			</div>

			<div className='form-group'>
				<label htmlFor='message'>Melding *</label>
				<textarea
					id='message'
					name='message'
					value={formData.message}
					onChange={handleChange}
					rows={6}
					required
					disabled={isSubmitting}
					placeholder='Skriv din melding her...'
				/>
			</div>

			<button type='submit' disabled={isSubmitting} className='primary-button'>
				{isSubmitting ? "Sender..." : "Send melding"}
			</button>

			<p className='form-note'>
				* Obligatoriske felt. Vi behandler din personlige informasjon i henhold
				til vår personvernpolicy.
			</p>
		</form>
	)
}
