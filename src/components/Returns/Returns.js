import React from 'react';

const ReturnPolicy = () => {
    return (
        <section className="bg-pink mt-4">
            <div className="max-w-[800px] mx-auto py-[35px] px-[20px]">
                <h2 className="text-[44px] text-center font-bold mb-[35px]">Return Policy</h2>

                <div className="text-[16px] space-y-[30px]">
                    <div>
                        <h3 className=" font-bold mb-1">Effective Date</h3>
                        <p>This Return Policy is effective as of [Insert Date]. At Book Tailor, we strive to ensure your satisfaction with every purchase. If you are not completely satisfied with your order, we’re here to help.</p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-1">1. Eligibility for Returns</h3>
                        <p>You may request a return or refund if:</p>
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Your book arrives damaged or defective.</li>
                            <li>There is a printing error caused by us.</li>
                            <li>You contact us within 14 days of receiving your order.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-1">2. Non-Returnable Items</h3>
                        <p>Certain items are not eligible for return, including:</p>
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Digital products (e.g., eBooks or downloadable content).</li>
                            <li>Custom-designed books that match the specifications provided by you.</li>
                            <li>Items marked as final sale.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-1">3. Return Process</h3>
                        <p>To initiate a return, follow these steps:</p>
                        <ol className="ml-[10px] leading-[23px] space-y-[8px]">
                            <li>1. Contact us at [Insert Contact Email] within 14 days of receiving your item.</li>
                            <li>2. Provide your order number and a description of the issue, along with photos if applicable.</li>
                            <li>3. Wait for a confirmation email with return instructions.</li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="font-bold mb-1">4. Refunds</h3>
                        <p>Refunds are processed once we receive and inspect the returned item. Refunds will:</p>
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Be credited to your original payment method.</li>
                            <li>Exclude shipping fees, unless the return is due to our error (e.g., defective or incorrect items).</li>
                        </ul>
                        <p>Please allow 5-10 business days for the refund to appear on your statement after processing.</p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-1">5. Replacements</h3>
                        <p>If your book arrives damaged, defective, or incorrect, we will provide a replacement at no additional cost. Contact us within 14 days to arrange a replacement.</p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-1">6. Shipping Costs</h3>
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>You are responsible for return shipping costs unless the issue is caused by us (e.g., defective or incorrect items).</li>
                            <li>We recommend using a trackable shipping service for returns to ensure the package reaches us.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-1">7. Contact Us</h3>
                        <p>If you have any questions about this Return Policy or need assistance with a return, please contact us at [Insert Contact Email]. We’re here to help resolve any issues and ensure your satisfaction.</p>
                        <p>Thank you for choosing Book Tailor! We value your trust and are committed to delivering a product you love.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReturnPolicy;
