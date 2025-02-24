import React from 'react';

const ReturnPolicy = () => {
    return (
        <section className="bg-pink mt-4">
            <div className="max-w-[800px] mx-auto py-[35px] px-[20px]">
                <h2 className="text-[44px] text-center font-bold mb-[35px]">Return &amp; Refund Policy</h2>
<div className="mb-7">At Book Tailor, we are committed to providing high-quality personalized books. Due to the customized nature of our products, returns and refunds are only available under specific circumstances outlined below.
</div>
                <div className="text-[16px] space-y-[30px]">
                    <div>
                        <h3 className="text-[20px] font-bold mb-2">Return &amp; Refund Eligibility</h3>
                        <p>We accept returns and issue refunds only if the book arrives damaged. A book is considered damaged if it has significant defects that affect readability, such as torn pages, printing errors, or physical damage sustained during shipping.</p>
                    </div>

                    <div>
                        <h3 className="text-[20px] font-bold mb-2">Non-Refundable &amp; Non-Returnable Items</h3>
                        <p>Since each book is made specifically for the customer, we do not offer refunds or returns for reasons other than damage during shipping or printing defects. Please review your order carefully before placing it to ensure accuracy.</p>
                    </div>

                    <div>
                        <h3 className="text-[20px] font-bold mb-2">How to Request a Return or Refund</h3>
                        <p className='mb-2'>If your book arrives damaged, please follow these steps:</p>
                        <ul className="pl-4 leading-[23px] space-y-[8px]">
                            <li>1. Contact Us Within 10 Days &ndash; Send an email to <a href="mailto:support@booktailor.com">support@booktailor.com</a> within 10 days of receiving your order.</li>
                            <li>2. Provide Proof of Damage &ndash; Include clear photos of the damaged book and packaging in your email.</li>
                            <li>3. Await Confirmation &ndash; Our team will review your request and notify you of the next steps.</li>
                            <li>4. Return (if required) &ndash; If we request a return, we will provide shipping instructions. You may be required to return the book before receiving a refund or replacement.</li>
                            <li>5. Refund or Replacement &ndash; Upon approval, we will either issue a full refund to your original payment method or send a replacement book at no additional cost.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[20px] font-bold mb-2">Customer Support</h3>
                        <p>If you have any questions about our return policy, please reach out to our support team at <a href="mailto:support@booktailor.com">support@booktailor.com</a>.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReturnPolicy;
