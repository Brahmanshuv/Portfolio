import { CreditCard } from "./credit-card/credit-card";

export default function ContactCardSection() {
    return (
        <section className="py-24 flex justify-center">
            <CreditCard
                company="Untitled."
                cardNumber="1234 1234 1234 1234"
                cardHolder="OLIVIA RHYE"
                cardExpiration="06/28"
            />
        </section>
    );
}
