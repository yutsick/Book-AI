import React from 'react'

function page() {
    return (
        <section className="bg-pink mt-4">
            <div className="max-w-[800px] mx-auto py-[35px] px-[20px]">
                <h1 className="text-[32px] md:text-[44px] text-center font-bold mb-2">California Privacy Notice</h1>
                <p className="text-gray-600 text-center mb-[35px]">Last Updated: February 17, 2025</p>

                <div className="text-[16px] space-y-[30px]">
                    <div>
                        <h2 className="text-[24px] font-bold mb-2">1. Information Collection and Use</h2>
                        <h3 className="text-[20px] font-bold mb-1">1.1 Categories of Personal Information</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full  text-left">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 border-r sticky left-0 bg-gray-100">Category</th>
                                        <th className="p-2 border-r">Examples</th>
                                        <th className="p-2">Collected</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { category: "Identifiers", examples: "Name, email, address, IP", collected: "YES" },
                                        { category: "Personal Info", examples: "Address, phone, payment", collected: "YES" },
                                        { category: "Protected Class", examples: "Age, gender", collected: "YES" },
                                        { category: "Commercial Info", examples: "Purchase history", collected: "YES" },
                                        { category: "Geolocation", examples: "Physical location", collected: "YES" },
                                        { category: "Sensory Data", examples: "Audio, video", collected: "NO" },
                                        { category: "Employment Data", examples: "Job history", collected: "NO" },
                                    ].map((row, index) => (
                                        <tr key={index} className="border-b ">
                                            <td className="p-2 border-r font-semibold sticky left-0 ">{row.category}</td>
                                            <td className="p-2 border-r">{row.examples}</td>
                                            <td className="p-2">{row.collected}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[20px] font-bold mb-1">1.2 Sources of Personal Information</h3>
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Direct interactions with consumers</li>
                            <li>Automated technologies or interactions</li>
                            <li>Third-party service providers</li>
                            <li>Advertising and analytics providers</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[24px] font-bold mb-2">2. Use and Disclosure of Personal Information</h2>
                        <h3 className="text-[20px] font-bold mb-1">2.1 Business or Commercial Purposes</h3>
                        <div>
                        Both Book Tailor and its Parent Company may use or disclose personal information for:

                        </div>
                        
                        
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Providing and maintaining our Service</li>
                            <li>Processing payments and transactions</li>
                            <li>Marketing and advertising through various platforms</li>
                            <li>Analytics and Service improvement</li>
                            <li>Security and fraud prevention</li>
                            <li>Legal compliance</li>
                            <li>Communication with users</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[20px] font-bold mb-1">2.2 Sharing Personal Information</h3>
                        <p>We share personal information with:</p>

                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Service providers and processors</li>
                            <li>Advertising platforms (including but not limited to Facebook, TikTok, Snapchat, and other advertising platforms)</li>
                            <li>Analytics providers</li>
                            <li>Marketing partners</li>
                            <li>Payment processors</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-[24px] font-bold mb-2">3. Sales and Sharing of Personal Information</h2>
                        <h3 className="text-[20px] font-bold mb-1">3.1 Sale of Personal Information</h3>
                        <p>We do not sell personal information in the traditional sense. However, some sharing of information with third-party advertising partners may constitute a &quot;sale&quot; under CCPA/CPRA.</p>
                        <h3 className="text-[20px] font-bold mb-1">3.2 Sharing for Cross-Context Behavioral Advertising</h3>
                        <p>We share personal information with advertising partners for cross-context behavioral advertising purposes.</p>
                    </div>

                    <div>
                        <h2 className="text-[24px] font-bold mb-2">4. California Privacy Rights</h2>
                        <h3 className="text-[20px] font-bold mb-1">4.1 Your Rights</h3>
                        <p>You have the right to:</p>
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Know what personal information we collect and how it is used</li>
                            <li>Delete your personal information</li>
                            <li>Correct inaccurate personal information</li>
                            <li>Limit use and disclosure of sensitive personal information</li>
                            <li>Opt-out of the sale or sharing of personal information</li>
                            <li>Non-discrimination for exercising your rights</li>
                        </ul>

                        <h3 className="text-[20px] font-bold mb-1">4.2 Exercising Your Rights</h3>
                        <p>To exercise your rights, please email us at <a className="text-blue-500" href="mailto:privacy@booktailor.com">privacy@booktailor.com</a>. We will verify your request using:</p>
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Email address</li>
                            <li>Order history</li>
                            <li>Account information</li>
                        </ul>

                        <h3 className="text-[20px] font-bold mb-1">4.3 Response Timing</h3>
                        <p>We will respond to verifiable consumer requests within 45 days. If we require additional time, we will inform you in writing.</p>
                    </div>
                    <div>
                        <h2 className="text-[24px] font-bold mb-2">5. Notice of Financial Incentive</h2>
                        <p>If we offer any financial incentives permitted by CCPA/CPRA, we will provide notice and obtain consent as required by law.</p>
                    </div>

                    <div>
                        <h2 className="text-[24px] font-bold mb-2">6. Changes to This Notice</h2>
                        <p>We reserve the right to amend this Notice at our discretion and at any time. Changes will be communicated through our Service or via email.</p>
                    </div>

                    <div>
                        <h2 className="text-[24px] font-bold mb-2">7. Contact Information</h2>
                        <p>For questions or concerns about this Notice or your personal information:</p>
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Email: <a className="text-blue-500" href="mailto:privacy@booktailor.com">privacy@booktailor.com</a></li>
                        </ul>
                        <p>For general support and questions:</p>
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Email: <a className="text-blue-500" href="mailto:hi@booktailor.com">hi@booktailor.com</a></li>
                        </ul>
                        <p>Physical Address:</p>
                        <ul className="ml-[25px] list-disc leading-[23px]">
                            <li>Book Tailor, Inc.</li>
                            <li>1111B S Governors Ave STE 26192</li>
                            <li>Dover, Delaware 19904</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[24px] font-bold mb-2">8. Last Updated</h2>
                        <p>This Notice was last updated on February 17, 2025.</p>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default page
