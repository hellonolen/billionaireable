import React from 'react';

const PolicyLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Sidebar */}
            <div className="lg:col-span-3">
                <div className="sticky top-32">
                    <h2 className="font-serif text-2xl font-black mb-8">Legal Center</h2>
                    <ul className="space-y-4">
                        {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((item) => (
                            <li key={item} className={`font-mono text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors ${title === item ? 'text-black border-l-2 border-black pl-4' : 'text-gray-400 hover:text-black pl-4 border-l-2 border-transparent'}`}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-9">
                <h1 className="font-serif text-5xl md:text-6xl font-black text-black tracking-tighter mb-12">{title}</h1>
                <div className="prose prose-lg font-sans text-gray-600 max-w-none">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export const Privacy: React.FC = () => (
    <PolicyLayout title="Privacy Policy">
        <p>Last updated: November 22, 2025</p>

        <h3>1. Introduction</h3>
        <p>Welcome to Billionaireable ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>

        <h3>2. Important Information and Who We Are</h3>
        <p>This privacy policy aims to give you information on how Billionaireable collects and processes your personal data through your use of this website, including any data you may provide through this website when you sign up to our newsletter, purchase a product or service, or take part in a competition.</p>
        <p>This website is not intended for children and we do not knowingly collect data relating to children.</p>

        <h3>3. The Data We Collect About You</h3>
        <p>Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).</p>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
        <ul>
            <li><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender.</li>
            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
        </ul>

        <h3>4. How We Use Your Personal Data</h3>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
        </ul>

        <h3>5. Data Security</h3>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
    </PolicyLayout>
);

export const Terms: React.FC = () => (
    <PolicyLayout title="Terms of Service">
        <p>Last updated: November 22, 2025</p>

        <h3>1. Agreement to Terms</h3>
        <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Billionaireable ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").</p>
        <p>You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>

        <h3>2. Intellectual Property Rights</h3>
        <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.</p>

        <h3>3. User Representations</h3>
        <p>By using the Site, you represent and warrant that:</p>
        <ul>
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You are not a minor in the jurisdiction in which you reside.</li>
        </ul>

        <h3>4. Fees and Payment</h3>
        <p>We accept the following forms of payment: Visa, Mastercard, American Express, Discover.</p>
        <p>You may be required to purchase or pay a fee to access some of our services. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.</p>
        <p>We bill you through an online billing account for purchases made via the Site. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time.</p>

        <h3>5. Cancellation</h3>
        <p>All purchases are non-refundable. You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term.</p>
    </PolicyLayout>
);

export const Disclaimer: React.FC = () => (
    <PolicyLayout title="Disclaimer">
        <p>Last updated: November 22, 2025</p>

        <h3>1. Website Disclaimer</h3>
        <p>The information provided by Billionaireable ("we," "us" or "our") on this website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site.</p>

        <h3>2. Professional Disclaimer</h3>
        <p>The Site cannot and does not contain financial advice. The financial information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of financial advice. The use or reliance of any information contained on this website is solely at your own risk.</p>

        <h3>3. Testimonials Disclaimer</h3>
        <p>The Site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences. Your individual results may vary.</p>
    </PolicyLayout>
);
