// appapp/components/sections/Skreddersyddmaleriform.jsx
"use client";
import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { SpinningLoader } from "../SpinningLoader";

export default function SkreddersyddMaleriForm() {
    const [form, setForm] = useState({
        fullname: "",
        phone: "",
        email: "",
        wish: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Initialize EmailJS with your public key (runs in browser)
        if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
            emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
        } else {
            console.warn(
                "EmailJS public key not set (NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)"
            );
        }
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!form.fullname.trim()) newErrors.fullname = "Navn er påkrevd.";
        if (!form.email.trim()) newErrors.email = "Epost er påkrevd.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = "Ugyldig epostadresse.";
        if (!form.wish.trim())
            newErrors.wish = "Vennligst skriv inn ønsket motiv.";
        return newErrors;
    };

    const handleChange = (e) => {
        setForm((s) => ({ ...s, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setLoading(true);

        try {
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

            const templateParams = {
                from_name: form.fullname, // make sure your EmailJS template uses {{from_name}}
                email: form.email, // {{email}}
                phone: form.phone || "Not provided", // {{phone}}
                wish: form.wish, // {{wish}}
            };

            const resp = await emailjs.send(
                serviceId,
                templateId,
                templateParams
            );
            console.log("EmailJS success:", resp); // helpful for debugging
            setSuccess("Takk for meldingen! Jeg kontakter deg snart.");
            setForm({ fullname: "", phone: "", email: "", wish: "" });
        } catch (err) {
            console.error("EmailJS send failed:", err);
            setSuccess(null);
            setErrors({
                submit: "Noe gikk galt ved sending. Prøv igjen senere.",
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-screen grid place-items-center">
                <SpinningLoader />
            </div>
        );
    }

    return (
        <section
            id="onskeskjema"
            className="bg-black py-16 rounded-tr-[64px] border-t-2 border-primary-light"
        >
            <div className="inner flex flex-col gap-12 text-center">
                <div className="flex flex-col">
                    <h1 className="text-5xl sm:text-6xl font-extralight text-clr-primary-light mb-4">
                        Skreddersydd Maleri
                    </h1>
                    <p className="italic text-center sm:text-xl text-primary-light">
                        Ønsker du noe helt spesielt? <br />
                        Beskriv ditt kunstverk så kontakter jeg deg snart!
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-sm w-full mx-auto flex flex-col text-left gap-8"
                >
                    {/* Name */}
                    <span>
                        <label
                            htmlFor="fullname"
                            className="block font-light italic text-primary mb-1"
                        >
                            Ditt fulle navn*
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            value={form.fullname}
                            onChange={handleChange}
                            className="w-full bg-white text-black px-4 py-3"
                        />
                        {errors.fullname && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fullname}
                            </p>
                        )}
                    </span>

                    {/* Phone */}
                    <span>
                        <label
                            htmlFor="phone"
                            className="block font-light italic text-primary mb-1"
                        >
                            Telefon
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full bg-white text-black px-4 py-3"
                        />
                    </span>

                    {/* Email */}
                    <span>
                        <label
                            htmlFor="email"
                            className="block font-light italic text-primary mb-1"
                        >
                            Epost*
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-white text-black px-4 py-3"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </span>

                    {/* Wish */}
                    <span>
                        <label
                            htmlFor="wish"
                            className="block font-light italic text-primary mb-1"
                        >
                            Ditt ønske*
                        </label>
                        <textarea
                            id="wish"
                            rows={2}
                            value={form.wish}
                            onChange={handleChange}
                            className="w-full bg-white text-black px-4 py-3"
                        />
                        {errors.wish && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.wish}
                            </p>
                        )}
                    </span>

                    <span className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="btn-golden inline-block"
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? "Sender..." : "Send inn ønske"}
                        </button>
                        <span className="mt-1 italic font-light text-xs text-primary-light">
                            Trykk her for å sende inn skjema
                        </span>
                        {success && (
                            <p className="text-green-500 text-sm text-center mt-2">
                                {success}
                            </p>
                        )}
                        {errors.submit && (
                            <p className="text-red-500 text-sm text-center mt-2">
                                {errors.submit}
                            </p>
                        )}
                    </span>
                </form>
            </div>
        </section>
    );
}
